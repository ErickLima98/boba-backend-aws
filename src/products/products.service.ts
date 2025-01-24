import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CommonService } from 'src/core/commons/common-service';
import { ProductEntity } from 'src/database/entities/product.entity';
import { ModelClass, OrderByDescriptor } from 'objection';
import { DatabaseService } from 'src/database/database.service';
import { PaginationQueryConverted } from 'src/core/commons/pagination-query-converted';
import { ProductQueryDto } from './dto/query-product.dto';

@Injectable()
export class ProductsService extends CommonService {
  constructor(
    @Inject(ProductEntity.name)
    private productsService: ModelClass<ProductEntity>,
    private readonly databaseService: DatabaseService,
  ) {
    super(ProductsService.name);
  }

  async create(createProductDto: CreateProductDto) {
    return this.databaseService.databaseTransaction<ProductEntity>(
      async (trx) => {
        const product: ProductEntity = await this.productsService
          .query(trx)
          .insert(createProductDto);
        return await ProductEntity.getFullEntityData(product.$id(), trx);
      },
    );
  }

  async findAll(query: ProductQueryDto) {
    const paginationOptions: PaginationQueryConverted =
      this.paginatedResponse(query);
    const queryBuilder = this.productsService
      .query()
      .select(ProductEntity.paginationAttributes)
      .where((builder) => ProductEntity.filters(query, builder))
      .orderBy(paginationOptions.orderBy as OrderByDescriptor[]);
    return this.generateMetaResponse(
      await this.paginateBuilderResults(queryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: string) {
    return this.databaseService.forcefullyFindOne<ProductEntity>(
      ProductEntity.getFullEntityData(id),
    );
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return this.databaseService.databaseTransaction<ProductEntity>(
      async (trx) => {
        const product: ProductEntity =
          await this.databaseService.forcefullyFindOne<ProductEntity>(
            this.productsService
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await product.$query(trx).update(updateProductDto);
        return await ProductEntity.getFullEntityData(id, trx);
      },
    );
  }

  async remove(id: string) {
    return this.databaseService.databaseTransaction<ProductEntity>(
      async (trx) => {
        const product: ProductEntity =
          await this.databaseService.forcefullyFindOne<ProductEntity>(
            this.productsService
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await product.$query(trx).update({ is_inactive: true });
        return product;
      },
    );
  }
}

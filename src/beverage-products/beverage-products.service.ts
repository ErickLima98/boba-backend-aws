import { Inject, Injectable } from '@nestjs/common';
import { CreateBeverageProductDto } from './dto/create-beverage-product.dto';
import { UpdateBeverageProductDto } from './dto/update-beverage-product.dto';
import { BeverageProductQueryDto } from './dto/query-beverage-product.dto';
import { CommonService } from 'src/core/commons/common-service';
import { BeverageProductEntity } from 'src/database/entities/beverage-product.entity';
import { ModelClass, OrderByDescriptor } from 'objection';
import { DatabaseService } from 'src/database/database.service';
import { PaginationQueryConverted } from 'src/core/commons/pagination-query-converted';

@Injectable()
export class BeverageProductsService extends CommonService {
  constructor(
    @Inject(BeverageProductEntity.name)
    private beverageProductsService: ModelClass<BeverageProductEntity>,
    private readonly databaseService: DatabaseService,
  ) {
    super(BeverageProductsService.name);
  }
  async create(createBeverageProductDto: CreateBeverageProductDto) {
    return this.databaseService.databaseTransaction<BeverageProductEntity>(
      async (trx) => {
        const beverageProduct: BeverageProductEntity =
          await this.beverageProductsService
            .query(trx)
            .insert(createBeverageProductDto);
        return await BeverageProductEntity.getFullEntityData(
          beverageProduct.$id(),
          trx,
        );
      },
    );
  }

  async findAll(query: BeverageProductQueryDto) {
    const paginationOptions: PaginationQueryConverted =
      this.paginatedResponse(query);
    const queryBuilder = this.beverageProductsService
      .query()
      .select(BeverageProductEntity.paginationAttributes)
      .where((builder) => BeverageProductEntity.filters(query, builder))
      .orderBy(paginationOptions.orderBy as OrderByDescriptor[]);
    return this.generateMetaResponse(
      await this.paginateBuilderResults(queryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: string) {
    return this.databaseService.forcefullyFindOne<BeverageProductEntity>(
      BeverageProductEntity.getFullEntityData(id),
    );
  }

  async update(id: string, updateBeverageProductDto: UpdateBeverageProductDto) {
    return this.databaseService.databaseTransaction<BeverageProductEntity>(
      async (trx) => {
        const beverageProduct: BeverageProductEntity =
          await this.databaseService.forcefullyFindOne<BeverageProductEntity>(
            this.beverageProductsService.query(trx).findById(id),
          );
        await beverageProduct.$query(trx).update(updateBeverageProductDto);
        return await BeverageProductEntity.getFullEntityData(id, trx);
      },
    );
  }

  async remove(id: string) {
    return this.databaseService.databaseTransaction<BeverageProductEntity>(
      async (trx) => {
        await this.beverageProductsService.query(trx).deleteById(id);
        return await BeverageProductEntity.getFullEntityData(id, trx);
      },
    );
  }
}

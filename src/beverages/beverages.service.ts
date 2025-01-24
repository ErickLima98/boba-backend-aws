import { Inject, Injectable } from '@nestjs/common';
import { CreateBeverageDto } from './dto/create-beverage.dto';
import { UpdateBeverageDto } from './dto/update-beverage.dto';
import { CommonService } from 'src/core/commons/common-service';
import { BeverageEntity } from 'src/database/entities/beverage.entity';
import { ModelClass } from 'objection';
import { DatabaseService } from 'src/database/database.service';
import { BeverageQueryDto } from './dto/query-beverage.dto';
import { PaginationQueryConverted } from 'src/core/commons/pagination-query-converted';

@Injectable()
export class BeveragesService extends CommonService {
  constructor(
    @Inject(BeverageEntity.name)
    private beverageServices: ModelClass<BeverageEntity>,
    private readonly databaseService: DatabaseService,
  ) {
    super(BeveragesService.name);
  }

  async create(createBeverageDto: CreateBeverageDto) {
    return this.databaseService.databaseTransaction<BeverageEntity>(
      async (trx) => {
        const beverage: BeverageEntity = await this.beverageServices
          .query(trx)
          .insert({
            ...createBeverageDto,
            recipe: JSON.stringify(createBeverageDto.recipe),
          });
        return await BeverageEntity.getFullEntityData(beverage.$id(), trx);
      },
    );
  }

  async findAll(query: BeverageQueryDto) {
    const paginationOptions: PaginationQueryConverted =
      this.paginatedResponse(query);
    const queryBuilder = this.beverageServices
      .query()
      .select(BeverageEntity.paginationAttributes)
      .where((builder) => BeverageEntity.filters(query, builder))
      .andWhere({ is_inactive: false }).orderByRaw(`
        regexp_replace(beverages.code, '\\d+', '', 'g') ASC,
        NULLIF(regexp_replace(beverages.code, '\\D+', '', 'g'), '')::int ASC
      `);
    return this.generateMetaResponse(
      await this.paginateBuilderResults(queryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: string) {
    return this.databaseService.forcefullyFindOne<BeverageEntity>(
      BeverageEntity.getFullEntityData(id),
    );
  }

  async update(id: string, updateBeverageDto: UpdateBeverageDto) {
    return this.databaseService.databaseTransaction<BeverageEntity>(
      async (trx) => {
        const beverage: BeverageEntity =
          await this.databaseService.forcefullyFindOne<BeverageEntity>(
            this.beverageServices
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await beverage.$query(trx).update({
          ...updateBeverageDto,
          recipe: JSON.stringify(updateBeverageDto.recipe) ?? beverage.recipe,
        });
        return await BeverageEntity.getFullEntityData(id, trx);
      },
    );
  }

  async remove(id: string) {
    return this.databaseService.databaseTransaction<BeverageEntity>(
      async (trx) => {
        const beverage: BeverageEntity =
          await this.databaseService.forcefullyFindOne<BeverageEntity>(
            this.beverageServices
              .query(trx)
              .findById(id)
              .where({ is_inactive: false }),
          );
        await beverage.$query(trx).update({ is_inactive: true });
        return beverage;
      },
    );
  }
}

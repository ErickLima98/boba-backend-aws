import { Inject, Injectable } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { FoodQueryDto } from './dto/query-food.dto';
import { CommonService } from 'src/core/commons/common-service';
import { FoodEntity } from 'src/database/entities/food.entity';
import { ModelClass, OrderByDescriptor } from 'objection';
import { DatabaseService } from 'src/database/database.service';
import { PaginationQueryConverted } from 'src/core/commons/pagination-query-converted';

@Injectable()
export class FoodsService extends CommonService {
  constructor(
    @Inject(FoodEntity.name)
    private foodService: ModelClass<FoodEntity>,
    private readonly databaseService: DatabaseService,
  ) {
    super(FoodsService.name);
  }

  async create(createFoodDto: CreateFoodDto) {
    return this.databaseService.databaseTransaction<FoodEntity>(async (trx) => {
      const food: FoodEntity = await this.foodService
        .query(trx)
        .insert(createFoodDto);
      return await FoodEntity.getFullEntityData(food.$id(), trx);
    });
  }

  async findAll(query: FoodQueryDto) {
    const paginationOptions: PaginationQueryConverted =
      this.paginatedResponse(query);
    const queryBuilder = this.foodService
      .query()
      .select(FoodEntity.paginationAttributes)
      .where((builder) => FoodEntity.filters(query, builder))
      .andWhere({ is_inactive: false })
      .orderBy(paginationOptions.orderBy as OrderByDescriptor[]);
    return this.generateMetaResponse(
      await this.paginateBuilderResults(queryBuilder, paginationOptions),
      paginationOptions,
    );
  }

  async findOne(id: string) {
    return this.databaseService.forcefullyFindOne<FoodEntity>(
      FoodEntity.getFullEntityData(id),
    );
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    return this.databaseService.databaseTransaction<FoodEntity>(async (trx) => {
      const food: FoodEntity =
        await this.databaseService.forcefullyFindOne<FoodEntity>(
          this.foodService
            .query(trx)
            .findById(id)
            .where({ is_inactive: false }),
        );
      await food.$query(trx).update(updateFoodDto);
      return await FoodEntity.getFullEntityData(id, trx);
    });
  }

  async remove(id: string) {
    return this.databaseService.databaseTransaction<FoodEntity>(async (trx) => {
      const food: FoodEntity =
        await this.databaseService.forcefullyFindOne<FoodEntity>(
          this.foodService
            .query(trx)
            .findById(id)
            .where({ is_inactive: false }),
        );
      await food.$query(trx).update({ is_inactive: true });
      return food;
    });
  }
}

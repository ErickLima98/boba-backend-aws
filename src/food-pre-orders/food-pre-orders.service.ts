import { Inject, Injectable } from '@nestjs/common';
import { CreateFoodPreOrderDto } from './dto/create-food-pre-order.dto';
import { UpdateFoodPreOrderDto } from './dto/update-food-pre-order.dto';
import { SaleEntity } from 'src/database/entities/sale.entity';
import { ModelClass, Transaction } from 'objection';
import { CommonService } from 'src/core/commons/common-service';
import { FoodPreOrderEntity } from 'src/database/entities/food-pre-order.entity';
import { DatabaseService } from 'src/database/database.service';
import { FoodEntity } from 'src/database/entities/food.entity';

@Injectable()
export class FoodPreOrdersService extends CommonService {
  constructor(
    @Inject(FoodPreOrderEntity.name)
    private foodPreOrdersService: ModelClass<FoodPreOrderEntity>,
    private readonly databaseService: DatabaseService,
    @Inject(FoodEntity.name)
    private foodService: ModelClass<FoodEntity>,
  ) {
    super(FoodPreOrdersService.name);
  }
  async create(
    createFoodPreOrderDto: CreateFoodPreOrderDto,
    sale: SaleEntity,
    totalFoodSale: number,
    trx: Transaction,
  ) {
    const food = await this.foodService
      .query(trx)
      .findById(createFoodPreOrderDto.food_id);
    await food
      .$query(trx)
      .update({ amount: food.amount - createFoodPreOrderDto.amount });
    return sale.$relatedQuery('food_pre_orders', trx).insert({
      ...createFoodPreOrderDto,
      total: totalFoodSale,
    });
  }

  async findOne(id: string) {
    return this.databaseService.forcefullyFindOne<FoodPreOrderEntity>(
      FoodPreOrderEntity.getFullEntityData(id),
    );
  }

  async update(
    sale: SaleEntity,
    updateFoodPreOrderDto: UpdateFoodPreOrderDto[],
    trx?: Transaction | null,
  ) {
    await this.deleteNotIncludedOrders(sale, updateFoodPreOrderDto, trx);
    if (updateFoodPreOrderDto && updateFoodPreOrderDto.length > 0) {
      await sale
        .$relatedQuery('food_pre_orders', trx)
        .insert(updateFoodPreOrderDto)
        .onConflict('id')
        .merge();
    }
  }

  private async deleteNotIncludedOrders(
    sale: SaleEntity,
    updateFoodPreOrderDto: UpdateFoodPreOrderDto[],
    trx: Transaction,
  ) {
    const existingOrderIds: string[] = await this.foodPreOrdersService
      .query(trx)
      .select('id')
      .where('sale_id', sale.id)
      .then((items) => items.map((item) => item.$id()));

    const dtoOrdersIds: string[] = updateFoodPreOrderDto.map(
      (detail) => detail.id,
    );
    const idsToDelete: string[] = existingOrderIds.filter(
      (item) => !dtoOrdersIds.includes(item),
    );

    if (idsToDelete && idsToDelete.length > 0) {
      await this.foodPreOrdersService
        .query(trx)
        .delete()
        .whereIn('id', idsToDelete);
    }
  }
}

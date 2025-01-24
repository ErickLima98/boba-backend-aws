import {
  Model,
  ModelOptions,
  QueryBuilder,
  QueryContext,
  RelationMappings,
  RelationMappingsThunk,
  Transaction,
} from 'objection';
import { FoodEntity } from './food.entity';
import { BaseEntity } from './base.entity';
import { SaleEntity } from './sale.entity';

export class FoodPreOrderEntity extends BaseEntity {
  static tableName: string = 'food_pre_orders';

  food_id: string;
  amount: number;
  total: number;
  created_at: Date;
  updated_at: Date;

  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    this.updated_at = new Date();
    await super.$beforeUpdate(opt, queryContext);
  }

  static paginationAttributes = [
    'food_pre_orders.id',
    'food_pre_orders.food_id',
    'food_pre_orders.amount',
    'food_pre_orders.total',
    'food_pre_orders.created_at',
    'food_pre_orders.updated_at',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      food: {
        modelClass: FoodEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'food_pre_orders.food_id',
          to: 'foods.id',
        },
      },
      sale: {
        modelClass: SaleEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'food_pre_orders.sale_id',
          to: 'sales.id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<FoodPreOrderEntity, FoodPreOrderEntity> {
    return this.query(trx).select(this.paginationAttributes).findById(id);
  }
}

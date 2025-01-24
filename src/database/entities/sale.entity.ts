import {
  Model,
  ModelOptions,
  Pojo,
  QueryBuilder,
  QueryContext,
  RelationMappings,
  RelationMappingsThunk,
  Transaction,
} from 'objection';
import { BaseEntity } from './base.entity';
import { BeveragePreOrderEntity } from './beverage-pre-order.entity';
import { FoodPreOrderEntity } from './food-pre-order.entity';
import { SalesQueryDto } from 'src/sales/dto/query-sale.dto';
export class SaleEntity extends BaseEntity {
  static tableName: string = 'sales';

  total: number;
  is_cash: boolean;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  is_inactive: boolean;
  description?: string | null;
  sale_date?: string | null;
  sale_hour?: string | null;

  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    this.updated_at = new Date();
    await super.$beforeUpdate(opt, queryContext);
  }

  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json);
    return json;
  }

  static paginationAttributes = [
    'sales.id',
    'sales.total',
    'sales.is_cash',
    'sales.user_id',
    'sales.created_at',
    'sales.updated_at',
    'sales.description',
    'sales.sale_date',
    'sales.sale_hour',
    'sales.is_inactive',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      beverage_pre_orders: {
        modelClass: BeveragePreOrderEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'sales.id',
          to: 'beverage_pre_orders.sale_id',
        },
      },
      food_pre_orders: {
        modelClass: FoodPreOrderEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'sales.id',
          to: 'food_pre_orders.sale_id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<SaleEntity, SaleEntity> {
    return this.query(trx)
      .select(this.paginationAttributes)
      .findById(id)
      .withGraphJoined('beverage_pre_orders')
      .withGraphJoined('food_pre_orders');
  }

  static filters(
    query: SalesQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (query.is_cash) {
      builder.andWhere('sales.is_cash', '=', query.is_cash);
    }
    if (query.user_id) {
      builder.andWhere('sales.user_id', '=', query.user_id);
    }
    if (query.created_at) {
      builder.andWhere('sales..', '=', query.created_at);
    }
    return builder;
  }
}

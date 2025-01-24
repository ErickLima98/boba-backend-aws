import {
  Model,
  ModelOptions,
  QueryBuilder,
  QueryContext,
  RelationMappings,
  RelationMappingsThunk,
  Transaction,
} from 'objection';
import { BaseEntity } from './base.entity';
import { BeverageEntity } from './beverage.entity';
import { SaleEntity } from './sale.entity';

export class BeveragePreOrderEntity extends BaseEntity {
  static tableName: string = 'beverage_pre_orders';

  beverage_id: string;
  sugar_level: number;
  beverage_size: string;
  amount: number;
  extra_boba: number;
  total: number;
  sale_id: number;
  created_at: Date;
  updated_at: Date;
  is_smoothie: boolean;
  product_id?: number | null;
  coverage_type?: string | null;

  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    this.updated_at = new Date();
    await super.$beforeUpdate(opt, queryContext);
  }

  static paginationAttributes = [
    'beverage_pre_orders.id',
    'beverage_pre_orders.beverage_id',
    'beverage_pre_orders.sugar_level',
    'beverage_pre_orders.beverage_size',
    'beverage_pre_orders.amount',
    'beverage_pre_orders.extra_boba',
    'beverage_pre_orders.total',
    'beverage_pre_orders.sale_id',
    'beverage_pre_orders.created_at',
    'beverage_pre_orders.updated_at',
    'beverage_pre_orders.is_smoothie',
    'beverage_pre_orders.description',
    'beverage_pre_orders.product_id',
    'beverage_pre_orders.coverage_type',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      beverage: {
        modelClass: BeverageEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'beverage_pre_orders.beverage_id',
          to: 'beverages.id',
        },
      },
      sale: {
        modelClass: SaleEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'beverage_pre_orders.sale_id',
          to: 'sales.id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<BeveragePreOrderEntity, BeveragePreOrderEntity> {
    return this.query(trx).select(this.paginationAttributes).findById(id);
  }

  static beverageSizeEnum = ['medium', 'large'];
  static sugarLevelEnum = [1, 2, 3, 4];
  static coverageTypeEnum = ['sello', 'domo'];
}

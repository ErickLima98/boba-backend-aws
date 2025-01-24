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
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';
import { InventoryHistoryQueryDto } from 'src/inventory-history/dto/query-inventory-history.dto';
export class InventoryHistoryEntity extends BaseEntity {
  static tableName: string = 'inventory_history';

  product_id: string;
  user_id: string;
  product_amount: number;
  current_product_amount: number;
  ingresed_product_date: string;
  current_cash: number;
  created_at: Date;
  updated_at: Date;
  is_inactive: boolean;

  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    this.updated_at = new Date();
    await super.$beforeUpdate(opt, queryContext);
  }

  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json);
    return json;
  }

  static paginationAttributes = [
    'inventory_history.id',
    'inventory_history.product_id',
    'inventory_history.user_id',
    'inventory_history.product_amount',
    'inventory_history.current_product_amount',
    'inventory_history.ingresed_product_date',
    'inventory_history.current_cash',
    'inventory_history.created_at',
    'inventory_history.updated_at',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      products: {
        modelClass: ProductEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'inventory_history.product_id',
          to: 'products.id',
        },
      },
      users: {
        modelClass: UserEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'inventory_history.user_id',
          to: 'users.id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<InventoryHistoryEntity, InventoryHistoryEntity> {
    return this.query(trx)
      .select(this.paginationAttributes)
      .findById(id)
      .withGraphJoined('products')
      .withGraphJoined('users');
  }

  static filters(
    query: InventoryHistoryQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (query.product_id) {
      builder.andWhere('inventory_history.product_id', '=', query.product_id);
    }
    if (query.user_id) {
      builder.andWhere('inventory_history.user_id', '=', query.user_id);
    }
    return builder;
  }
}

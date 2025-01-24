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
import { BeverageEntity } from './beverage.entity';
import { ProductEntity } from './product.entity';
import { BeverageProductQueryDto } from 'src/beverage-products/dto/query-beverage-product.dto';

export class BeverageProductEntity extends BaseEntity {
  static tableName: string = 'beverage_products';

  beverage_id: string;
  product_id: string;
  created_at: Date;
  updated_at: Date;

  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    this.updated_at = new Date();
    await super.$beforeUpdate(opt, queryContext);
  }

  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json);
    delete json.is_inactive;
    return json;
  }

  static paginationAttributes = [
    'beverage_products.id',
    'beverage_products.beverage_id',
    'beverage_products.product_id',
    'beverage_products.used_amount',
    'beverage_products.created_at',
    'beverage_products.updated_at',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      beverage: {
        modelClass: BeverageEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'beverage_products.beverage_id',
          to: 'beverages.id',
        },
      },
      product: {
        modelClass: ProductEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'beverage_products.product_id',
          to: 'products.id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<BeverageProductEntity, BeverageProductEntity> {
    return this.query(trx).select(this.paginationAttributes).findById(id);
  }

  static filters(
    query: BeverageProductQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (query.beverage_id) {
      builder.andWhere('beverage_products.beverage_id', query.beverage_id);
    }
    return builder;
  }
}

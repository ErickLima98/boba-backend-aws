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
import { FranchiseEntity } from './franchise.entity';
import { ProductQueryDto } from 'src/products/dto/query-product.dto';
import { BeverageProductEntity } from './beverage-product.entity';

export class ProductEntity extends BaseEntity {
  static tableName: string = 'products';

  name: string;
  description?: string | null;
  amount: number;
  minimal_amount: number;
  franchise_id: string;
  price: number;
  created_at: Date;
  updated_at: Date;
  is_inactive: boolean;
  url: string;
  used_amount: number;

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
    'products.id',
    'products.name',
    'products.description',
    'products.amount',
    'products.minimal_amount',
    'products.franchise_id',
    'products.price',
    'products.created_at',
    'products.updated_at',
    'products.url',
    'products.used_amount',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      franchise: {
        modelClass: FranchiseEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'products.franchise_id',
          to: 'franchises.id',
        },
      },
      beverage_products: {
        modelClass: BeverageProductEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'products.id',
          to: 'beverage_products.product_id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<ProductEntity, ProductEntity> {
    return this.query(trx)
      .select(this.paginationAttributes)
      .findById(id)
      .where('products.is_inactive', false);
  }

  static filters(
    query: ProductQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (query.name) {
      builder.andWhere(
        'products.name',
        'ILIKE',
        `%${this.unaccentString(query.name)}%`,
      );
    }
    if (query.franchise_id) {
      builder.andWhere('products.franchise_id', query.franchise_id);
    }
    if (query.is_inactive) {
      builder.andWhere('products.is_inactive', query.is_inactive);
    }
    return builder;
  }
}

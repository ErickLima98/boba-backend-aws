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
import { BeverageQueryDto } from 'src/beverages/dto/query-beverage.dto';
import { BeverageProductEntity } from './beverage-product.entity';

export class BeverageEntity extends BaseEntity {
  static tableName: string = 'beverages';

  name: string;
  code: string;
  medium_price: number;
  large_price: number;
  created_at: Date;
  updated_at: Date;
  is_inactive: boolean;
  url?: string | null;
  recipe?: string | null;

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
    'beverages.id',
    'beverages.name',
    'beverages.code',
    'beverages.medium_price',
    'beverages.large_price',
    'beverages.created_at',
    'beverages.updated_at',
    'beverages.url',
    'beverages.recipe',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      beverage_products: {
        modelClass: BeverageProductEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'beverages.id',
          to: 'beverage_products.beverage_id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<BeverageEntity, BeverageEntity> {
    return this.query(trx)
      .select(this.paginationAttributes)
      .findById(id)
      .where('beverages.is_inactive', false);
  }

  static filters(
    query: BeverageQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (query.name) {
      builder.andWhere(
        'beverages.name',
        'ILIKE',
        `%${this.unaccentString(query.name)}%`,
      );
    }
    if (query.code) {
      builder.andWhere('beverages.code', '=', query.code);
    }
    return builder;
  }
}

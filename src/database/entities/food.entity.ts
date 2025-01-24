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
import { FoodQueryDto } from 'src/foods/dto/query-food.dto';
import { FoodPreOrderEntity } from './food-pre-order.entity';

export class FoodEntity extends BaseEntity {
  static tableName: string = 'foods';

  name: string;
  code: string;
  price: number;
  created_at: Date;
  updated_at: Date;
  is_inactive: boolean;
  url: string;
  amount: number;

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
    'foods.id',
    'foods.name',
    'foods.code',
    'foods.price',
    'foods.created_at',
    'foods.updated_at',
    'foods.url',
    'foods.amount',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      food_pre_orders: {
        modelClass: FoodPreOrderEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'foods.id',
          to: 'food_pre_orders.food_id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<FoodEntity, FoodEntity> {
    return this.query(trx)
      .select(this.paginationAttributes)
      .findById(id)
      .where('foods.is_inactive', false);
  }

  static filters(
    query: FoodQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (query.name) {
      builder.andWhere(
        'foods.name',
        'ILIKE',
        `%${this.unaccentString(query.name)}%`,
      );
    }
    return builder;
  }
}

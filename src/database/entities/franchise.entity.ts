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
import { OwnerEntity } from './owner.entity';
import { FranchiseQueryDto } from 'src/franchises/dto/query-franchise.dto';
import { ExpenseEntity } from './expense.entity';
import { ProductEntity } from './product.entity';
import { ManagedFranchiseEntity } from './managed-franchise.entity';

export class FranchiseEntity extends BaseEntity {
  static tableName: string = 'franchises';

  name: string;
  franchise_address: string;
  created_at: Date;
  updated_at: Date;
  is_inactive: boolean;
  owner_id: string;

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
    'franchises.id',
    'franchises.name',
    'franchises.franchise_address',
    'franchises.created_at',
    'franchises.updated_at',
    'franchises.owner_id',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      owner: {
        modelClass: OwnerEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'franchises.owner_id',
          to: 'owners.id',
        },
      },
      managed_franchises: {
        modelClass: ManagedFranchiseEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'franchises.id',
          to: 'managed_franchises.franchise_id',
        },
      },
      expenses: {
        modelClass: ExpenseEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'franchises.id',
          to: 'expenses.franchise_id',
        },
      },
      products: {
        modelClass: ProductEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'franchises.id',
          to: 'products.franchise_id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<FranchiseEntity, FranchiseEntity> {
    return this.query(trx)
      .select(this.paginationAttributes)
      .findById(id)
      .where('franchises.is_inactive', false);
  }

  static filters(
    query: FranchiseQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (query.name) {
      builder.andWhere(
        'franchises.name',
        'ILIKE',
        `%${this.unaccentString(query.name)}%`,
      );
    }
    return builder;
  }
}

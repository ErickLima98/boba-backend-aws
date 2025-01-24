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
import { ExpensesQueryDto } from 'src/expenses/dto/query-expense.dto';

export class ExpenseEntity extends BaseEntity {
  static tableName: string = 'expenses';

  name: string;
  description?: string | null;
  amount: number;
  price: number;
  franchise_id?: string | null;
  is_variable: boolean;
  is_inactive: boolean;
  created_at: Date;
  updated_at: Date;
  expense_date?: string | null;
  expense_hour?: string | null;

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
    'expenses.id',
    'expenses.name',
    'expenses.description',
    'expenses.amount',
    'expenses.price',
    'expenses.franchise_id',
    'expenses.is_variable',
    'expenses.created_at',
    'expenses.updated_at',
    'expenses.expense_date',
    'expenses.expense_hour',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      franchise: {
        modelClass: FranchiseEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'expenses.franchise_id',
          to: 'franchises.id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<ExpenseEntity, ExpenseEntity> {
    return this.query(trx)
      .select(this.paginationAttributes)
      .findById(id)
      .where('expenses.is_inactive', false);
  }

  static filters(
    query: ExpensesQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (query.name) {
      builder.andWhere(
        'expenses.name',
        'ILIKE',
        `%${this.unaccentString(query.name)}%`,
      );
    }
    if (query.franchise_id) {
      builder.andWhere('expenses.franchise_id', query.franchise_id);
    }
    return builder;
  }
}

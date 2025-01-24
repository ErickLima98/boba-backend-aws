import {
  Model,
  QueryBuilder,
  RelationMappings,
  RelationMappingsThunk,
  Transaction,
} from 'objection';
import { BaseEntity } from './base.entity';
import { FranchiseEntity } from './franchise.entity';
import { ManagedFranchiseEntity } from './managed-franchise.entity';
import { UserQueryDto } from 'src/users/dto/query-user.dto';

export class UserEntity extends BaseEntity {
  static tableName = 'users';

  full_name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
  last_login_at: Date;
  login_count: number;
  logged_out_at: Date;
  is_inactive: boolean;
  franchise: FranchiseEntity | null;
  role: string;
  token: string;

  static paginationAttributes: string[] = [
    'users.id',
    'users.full_name',
    'users.email',
    'users.login_count',
    'users.created_at',
    'users.updated_at',
    'users.last_login_at',
  ];

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.is_inactive;
    delete json.token;
    return json;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      managed_franchise: {
        modelClass: ManagedFranchiseEntity,
        relation: Model.HasManyRelation,
        join: {
          from: 'users.id',
          to: 'managed_profiles.user_id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<UserEntity, UserEntity> {
    return this.query(trx).select(this.paginationAttributes).findById(id);
  }

  static filters(
    query: UserQueryDto,
    builder: QueryBuilder<Model, Model[]>,
  ): QueryBuilder<Model, Model[]> {
    if (query.email) {
      builder.andWhere(
        'users.email',
        'ILIKE',
        `%${this.unaccentString(query.email)}%`,
      );
    }
    return builder;
  }
}

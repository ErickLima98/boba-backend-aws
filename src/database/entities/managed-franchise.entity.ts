import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseEntity } from './base.entity';
import { FranchiseEntity } from './franchise.entity';
import { UserEntity } from './user.entity';

export class ManagedFranchiseEntity extends BaseEntity {
  static tableName = 'managed_franchises';

  role: number;
  user_id: string;
  permissions: string;
  franchise_id: string;
  created_at: string;
  updated_at: string;
  is_inactive: boolean;
  user: UserEntity;
  franchise: FranchiseEntity;

  static paginationAttributes = [
    'managed_profiles.id',
    'managed_profiles.user_id',
    'managed_profiles.role',
    'managed_profiles.franchise_id',
    'managed_profiles.created_at',
    'managed_profiles.updated_at',
  ];

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.is_inactive;
    return json;
  }

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      user: {
        modelClass: UserEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'managed_profiles.user_id',
          to: 'users.id',
        },
      },
      franchise: {
        modelClass: FranchiseEntity,
        relation: Model.BelongsToOneRelation,
        join: {
          from: 'managed_profiles.franchise_id',
          to: 'franchises.id',
        },
      },
    };
  }
}

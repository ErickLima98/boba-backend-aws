import { BaseEntity } from './base.entity';
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
import { FranchiseEntity } from './franchise.entity';

export class OwnerEntity extends BaseEntity {
  static tableName: string = 'owners';

  full_name: string;
  address?: string | null;
  phone_number?: string | null;
  email: string;
  password: string;
  // reset_password_token?: string | null;
  // reset_password_sent_at?: string | null;
  // sign_in_count: number;
  // last_sign_in_at?: string | null;
  // last_log_out_at?: string | null;
  // last_sign_in_ip?: string | null;
  created_at: Date;
  updated_at: Date;
  is_inactive: boolean;

  async $beforeUpdate(opt: ModelOptions, queryContext: QueryContext) {
    this.updated_at = new Date();
    await super.$beforeUpdate(opt, queryContext);
  }

  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json);
    delete json.encrypted_password;
    delete json.is_inactive;
    if (json.reset_password_token) {
      delete json.reset_password_token;
    }
    if (json.reset_password_sent_at) {
      delete json.reset_password_token;
    }
    return json;
  }

  static paginationAttributes = [
    'owners.id',
    'owners.full_name',
    'owners.email',
    'owners.phone_number',
    // 'owners.last_sign_in_at',
    // 'owners.sign_in_count',
    'owners.created_at',
    'owners.updated_at',
  ];

  static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      franchises: {
        modelClass: FranchiseEntity,
        relation: Model.HasOneRelation,
        join: {
          from: 'owners.id',
          to: 'franchises.owner_id',
        },
      },
    };
  }

  static getFullEntityData(
    id: string,
    trx?: Transaction,
  ): QueryBuilder<OwnerEntity, OwnerEntity> {
    return this.query(trx)
      .select(this.paginationAttributes)
      .findById(id)
      .where('owners.is_inactive', false);
  }
}

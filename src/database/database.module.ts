import * as Knex from 'knex';
import { Model } from 'objection';
import { Global, Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DatabaseService } from './database.service';
import { BobaDatabase } from '../core/constants/database-provider.constants';
import * as dbConfig from '../../knexfile';
import { FranchiseEntity } from './entities/franchise.entity';
import { ExpenseEntity } from './entities/expense.entity';
import { ProductEntity } from './entities/product.entity';
import { BeverageEntity } from './entities/beverage.entity';
import { BeverageProductEntity } from './entities/beverage-product.entity';
import { FoodEntity } from './entities/food.entity';
import { BeveragePreOrderEntity } from './entities/beverage-pre-order.entity';
import { FoodPreOrderEntity } from './entities/food-pre-order.entity';
import { SaleEntity } from './entities/sale.entity';
import { UserEntity } from './entities/user.entity';
import { OwnerEntity } from './entities/owner.entity';
import { ManagedFranchiseEntity } from './entities/managed-franchise.entity';
import { InventoryHistoryEntity } from './entities/inventory-history.entity';

dotenv.config();

// Insert database models here
const models = [
  FranchiseEntity,
  ExpenseEntity,
  ProductEntity,
  BeverageEntity,
  BeverageProductEntity,
  FoodEntity,
  BeveragePreOrderEntity,
  FoodPreOrderEntity,
  SaleEntity,
  UserEntity,
  OwnerEntity,
  ManagedFranchiseEntity,
  BeveragePreOrderEntity,
  FoodPreOrderEntity,
  SaleEntity,
  InventoryHistoryEntity,
];

const modelProviders = models.map((model) => {
  return {
    provide: model.name,
    useValue: model,
  };
});

let databaseConnection = dbConfig['development'];
switch (process.env.NODE_ENV) {
  case 'development':
    databaseConnection = {
      client: dbConfig['development']['client'],
      connection: dbConfig['development']['connection'],
      debug: false,
    };
    break;
  case 'production':
    databaseConnection = {
      client: dbConfig['production']['client'],
      connection: dbConfig['production']['connection'],
      debug: false,
    };
    break;
}

export const dbProvider = [
  ...modelProviders,
  {
    provide: BobaDatabase,
    useFactory: async () => {
      const knex = Knex.knex(databaseConnection);
      Model.knex(knex);
      return knex;
    },
  },
];

@Global()
@Module({
  providers: [DatabaseService, ...dbProvider],
  exports: [DatabaseService, ...dbProvider],
})
export class DatabaseModule {}

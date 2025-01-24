import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppLoggerMiddleware } from './core/middlewares/logger.middleware';
import { FranchisesModule } from './franchises/franchises.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ProductsModule } from './products/products.module';
import { BeveragesModule } from './beverages/beverages.module';
import { FoodsModule } from './foods/foods.module';
import { BeveragePreOrdersModule } from './beverage-pre-orders/beverage-pre-orders.module';
import { FoodPreOrdersModule } from './food-pre-orders/food-pre-orders.module';
import { SalesModule } from './sales/sales.module';
import { BeverageProductsModule } from './beverage-products/beverage-products.module';
import { UsersModule } from './users/users.module';
import { LoginModule } from './auth/users/login/login.module';
import { LogoutModule } from './auth/users/logout/logout.module';
import { InventoryHistoryModule } from './inventory-history/inventory-history.module';

@Module({
  controllers: [AppController],
  imports: [
    FranchisesModule,
    ExpensesModule,
    ProductsModule,
    BeveragesModule,
    FoodsModule,
    BeveragePreOrdersModule,
    FoodPreOrdersModule,
    SalesModule,
    BeverageProductsModule,
    UsersModule,
    LoginModule,
    LogoutModule,
    InventoryHistoryModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}

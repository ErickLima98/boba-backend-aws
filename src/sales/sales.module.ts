import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';
import { BeveragePreOrdersModule } from 'src/beverage-pre-orders/beverage-pre-orders.module';
import { FoodPreOrdersModule } from 'src/food-pre-orders/food-pre-orders.module';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
  imports: [BeveragePreOrdersModule, FoodPreOrdersModule],
})
export class SalesModule {}

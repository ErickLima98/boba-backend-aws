import { Module } from '@nestjs/common';
import { FoodPreOrdersService } from './food-pre-orders.service';

@Module({
  providers: [FoodPreOrdersService],
  exports: [FoodPreOrdersService],
})
export class FoodPreOrdersModule {}

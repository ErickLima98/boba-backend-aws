import { Module } from '@nestjs/common';
import { BeveragePreOrdersService } from './beverage-pre-orders.service';

@Module({
  providers: [BeveragePreOrdersService],
  exports: [BeveragePreOrdersService],
})
export class BeveragePreOrdersModule {}

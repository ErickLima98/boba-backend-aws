import { Module } from '@nestjs/common';
import { BeverageProductsService } from './beverage-products.service';
import { BeverageProductsController } from './beverage-products.controller';

@Module({
  controllers: [BeverageProductsController],
  providers: [BeverageProductsService],
})
export class BeverageProductsModule {}

import { Test, TestingModule } from '@nestjs/testing';
import { BeverageProductsController } from './beverage-products.controller';
import { BeverageProductsService } from './beverage-products.service';

describe('BeverageProductsController', () => {
  let controller: BeverageProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeverageProductsController],
      providers: [BeverageProductsService],
    }).compile();

    controller = module.get<BeverageProductsController>(
      BeverageProductsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

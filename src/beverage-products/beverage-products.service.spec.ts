import { Test, TestingModule } from '@nestjs/testing';
import { BeverageProductsService } from './beverage-products.service';

describe('BeverageProductsService', () => {
  let service: BeverageProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeverageProductsService],
    }).compile();

    service = module.get<BeverageProductsService>(BeverageProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

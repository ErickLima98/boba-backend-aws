import { Test, TestingModule } from '@nestjs/testing';
import { FoodPreOrdersService } from './food-pre-orders.service';

describe('FoodPreOrdersService', () => {
  let service: FoodPreOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodPreOrdersService],
    }).compile();

    service = module.get<FoodPreOrdersService>(FoodPreOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

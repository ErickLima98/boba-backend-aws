import { Test, TestingModule } from '@nestjs/testing';
import { BeveragePreOrdersService } from './beverage-pre-orders.service';

describe('BeveragePreOrdersService', () => {
  let service: BeveragePreOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeveragePreOrdersService],
    }).compile();

    service = module.get<BeveragePreOrdersService>(BeveragePreOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

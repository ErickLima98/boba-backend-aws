import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateSaleDto } from './create-sale.dto';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateBeveragePreOrderDto } from 'src/beverage-pre-orders/dto/update-beverage-pre-order.dto';
import { UpdateFoodPreOrderDto } from 'src/food-pre-orders/dto/update-food-pre-order.dto';

export class UpdateSaleDto extends PartialType(
  OmitType(CreateSaleDto, ['beverages', 'foods'] as const),
) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `ID of the sale to be updated, if ID its presents, sale 
            will be updated, otherwise will be deleted`,
    example: '10',
  })
  readonly id?: string | null;

  @IsOptional()
  @Type(() => UpdateBeveragePreOrderDto)
  @ApiProperty({
    description: 'Beverage pre orders to be updated',
  })
  readonly beverages?: UpdateBeveragePreOrderDto[] | null;

  @IsOptional()
  @Type(() => UpdateFoodPreOrderDto)
  @ApiProperty({
    description: 'Food pre orders to be updated',
  })
  readonly foods?: UpdateFoodPreOrderDto[] | null;
}

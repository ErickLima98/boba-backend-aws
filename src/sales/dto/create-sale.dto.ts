import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CreateBeveragePreOrderDto } from 'src/beverage-pre-orders/dto/create-beverage-pre-order.dto';
import { CreateFoodPreOrderDto } from 'src/food-pre-orders/dto/create-food-pre-order.dto';

export class CreateSaleDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `ID of the sale to be updated, if ID its presents, sale 
            will be updated, otherwise will be deleted`,
    example: '10',
  })
  readonly id?: string | null;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: `Boolean that indicates if the sales was paid with cash or with card
        if it was cash, boolean is true, otherwise false`,
    example: true,
  })
  readonly is_cash: boolean;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the user that made the sale',
    example: '10',
  })
  readonly user_id: string;

  @IsNotEmpty()
  @Type(() => CreateBeveragePreOrderDto)
  @ApiProperty({
    description: 'Beverage pre order data',
  })
  readonly beverages?: CreateBeveragePreOrderDto[] | null;

  @IsOptional()
  @Type(() => CreateFoodPreOrderDto)
  @ApiProperty({
    description: 'Food pre order data',
  })
  readonly foods?: CreateFoodPreOrderDto[] | null;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Description of the sale',
    example:
      '[{"id":73,"amount_medium":20,"amount_large":30},{"id":75,"amount_medium":10,"amount_large":20},{"id":5,"amount_medium":5,"amount_large":10}]',
  })
  readonly description: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Date of the sale',
    example: '26-08-2024',
  })
  readonly sale_date?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Hour of the sale',
    example: '10:45:17',
  })
  readonly sale_hour?: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Total of the sale',
    example: 25,
  })
  readonly total_beverage?: number | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Total of the sale',
    example: 25,
  })
  readonly total_food?: number | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Total of the sale',
    example: 25,
  })
  readonly total_sale?: number | null;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

class RecipeItem {
  @ApiProperty({ example: 66 })
  id: number;

  @ApiProperty({ example: 20 })
  amount_medium: number;

  @ApiProperty({ example: 30 })
  amount_large: number;
}
export class CreateBeverageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the beverage',
    example: 'Taro base leche',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Unique code of the beverage',
    example: 'A6',
  })
  readonly code: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Price of medium size beverage',
    example: 23.0,
  })
  readonly medium_price: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Price of large size beverage',
    example: 25.0,
  })
  readonly large_price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'URL related to the bevereage image',
    example: 'https://imagen_test.png',
  })
  readonly url?: string | null;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    description: 'Recipe of the beverage',
    example:
      '[{"id":73,"amount_medium":20,"amount_large":30},{"id":75,"amount_medium":10,"amount_large":20},{"id":5,"amount_medium":5,"amount_large":10}]',
  })
  readonly recipe?: RecipeItem[] | null;
}

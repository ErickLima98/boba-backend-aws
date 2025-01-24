import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductInfoDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the user that made the sale',
    example: '10',
  })
  readonly product_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Product amount to increase de inventory',
    example: 10,
  })
  readonly product_amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Current amount of the product before the increment',
    example: '10',
  })
  readonly current_product_amount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Date when the inventory where increased',
    example: '22-10-2024',
  })
  readonly ingresed_product_date: string;
}

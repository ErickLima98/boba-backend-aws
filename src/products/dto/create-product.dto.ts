import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the product',
    example: 'Grape bobas',
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Description related to the product',
    example: 'The amount of bobas is in lb',
  })
  readonly description?: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount of the product',
    example: 10,
  })
  readonly amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description:
      'Minimal amount of the product, to lauch minimal inventory alert',
    example: 2,
  })
  readonly minimal_amount: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'ID related to the franchise that owns the product',
    example: '10',
  })
  readonly franchise_id?: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Price of the product',
    example: 20.5,
  })
  readonly price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'URL related to the product image',
    example: 'https://imagen_test.png',
  })
  readonly url?: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount used of the product, with each beverage',
    example: 2,
  })
  readonly used_amount: number;
}

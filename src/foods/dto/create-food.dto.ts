import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFoodDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the food',
    example: 'Instant soup',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Code of the food',
    example: 'F-01',
  })
  readonly code: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'price of the food',
    example: 15.0,
  })
  readonly price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'URL related to the food image',
    example: 'https://imagen_test.png',
  })
  readonly url?: string | null;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    description: 'amount of the food',
    example: '20',
  })
  readonly amount?: number | null;
}

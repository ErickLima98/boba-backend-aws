import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateFoodPreOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the food',
    example: '1',
  })
  readonly food_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount of the food',
    example: 1,
  })
  readonly amount: number;
}

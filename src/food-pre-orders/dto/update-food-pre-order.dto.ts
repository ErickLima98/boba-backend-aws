import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFoodPreOrderDto } from './create-food-pre-order.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateFoodPreOrderDto extends PartialType(CreateFoodPreOrderDto) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `ID of the order to update, specified orders by ID will be updated it, 
            otherwise will be deleted, If no ID is provided for the object, the API will create a new one.`,
    example: '10',
  })
  readonly id?: string | null;
}

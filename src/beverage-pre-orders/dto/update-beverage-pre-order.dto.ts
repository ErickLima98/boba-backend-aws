import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBeveragePreOrderDto } from './create-beverage-pre-order.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateBeveragePreOrderDto extends PartialType(
  CreateBeveragePreOrderDto,
) {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `ID of the order to update, specified orders by the IDs will be updated, 
          otherwise will be deleted,
          If no ID is provided for the object, the API will create a new one.`,
    example: '10',
  })
  readonly id?: string | null;
}

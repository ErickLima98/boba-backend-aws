import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ProductInfoDto } from './products-info.dto';

export class CreateInventoryHistoryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `ID of the sale to be updated, if ID its presents, sale 
              will be updated, otherwise will be deleted`,
    example: '10',
  })
  readonly id?: string | null;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the user that made the sale',
    example: '10',
  })
  readonly user_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Current amount of the product before the increment',
    example: '10',
  })
  readonly current_cash: number;

  @IsNotEmpty()
  @Type(() => ProductInfoDto)
  @ApiProperty({
    description: 'Beverage pre order data',
  })
  readonly products?: ProductInfoDto[] | null;
}

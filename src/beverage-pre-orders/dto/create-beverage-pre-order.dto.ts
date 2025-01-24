import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BeveragePreOrderEntity } from 'src/database/entities/beverage-pre-order.entity';

export class CreateBeveragePreOrderDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the beverage',
    example: '1',
  })
  readonly beverage_id: string;

  @IsNotEmpty()
  @IsNumber()
  @IsEnum(BeveragePreOrderEntity.sugarLevelEnum)
  @ApiProperty({
    description: 'Sugar level of the beverage',
    example: BeveragePreOrderEntity.sugarLevelEnum[0],
    default: BeveragePreOrderEntity.sugarLevelEnum[0],
    enum: BeveragePreOrderEntity.sugarLevelEnum,
  })
  readonly sugar_level: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(BeveragePreOrderEntity.beverageSizeEnum)
  @ApiProperty({
    description: 'size of the beverage',
    example: BeveragePreOrderEntity.beverageSizeEnum[0],
    default: BeveragePreOrderEntity.beverageSizeEnum[0],
    enum: BeveragePreOrderEntity.beverageSizeEnum,
  })
  0;
  readonly beverage_size: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount of the beverage to sale',
    example: 2,
  })
  readonly amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Specifies if the beverage its with extra bobas',
  })
  readonly extra_boba: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'ID of the product used with the beverage',
    example: '1',
  })
  readonly product_id?: string | null;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Specifies if the beverage its with extra bobas',
  })
  readonly is_smoothie: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Description of the sale',
  })
  readonly description?: string | null;

  @IsNotEmpty()
  @IsString()
  @IsEnum(BeveragePreOrderEntity.coverageTypeEnum)
  @ApiProperty({
    description: 'size of the beverage',
    example: BeveragePreOrderEntity.coverageTypeEnum[0],
    default: BeveragePreOrderEntity.coverageTypeEnum[0],
    enum: BeveragePreOrderEntity.coverageTypeEnum,
  })
  readonly coverage_type: string;
}

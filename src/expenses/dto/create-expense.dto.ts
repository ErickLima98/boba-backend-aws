import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the expense',
    example: 'internet',
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Description of the expense',
    example: '1 pack of napkins',
  })
  readonly description?: string | null;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Amount of the expense',
    example: 1,
    default: 1,
  })
  readonly amount: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'price of the expense',
    example: 5.2,
  })
  readonly price: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'ID related to the franchise that registerd the expense',
    example: '10',
  })
  readonly franchise_id?: string | null;

  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty({
    description: 'Boolean to set if the expense is variable or fixed',
    example: true,
  })
  readonly is_variable: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Date of the expense',
    example: '26-08-2024',
  })
  readonly expense_date?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Hour of the expense',
    example: '10:45:17',
  })
  readonly expense_hour?: string | null;
}

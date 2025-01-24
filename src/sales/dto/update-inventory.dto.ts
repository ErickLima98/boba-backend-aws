import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DiscountInventoyDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: `ID of the product to be updated`,
    example: '10',
  })
  readonly id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: `Amount to discount`,
    example: 10,
  })
  readonly amount: number;
}

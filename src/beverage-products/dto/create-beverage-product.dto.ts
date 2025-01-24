import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBeverageProductDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID refered to the beverage',
    example: '10',
  })
  readonly beverage_id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID referede to the product used for the beverage',
    example: '10',
  })
  readonly product_id: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description:
      'Amount used to prepare the beverage, the number represents for example ounces',
    example: 5,
  })
  readonly used_amount: number;
}

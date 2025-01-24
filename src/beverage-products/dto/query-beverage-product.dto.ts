import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/core/commons/common-query.dto';

export class BeverageProductQueryDto extends CommonQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Get beverage product by beverage_id',
  })
  readonly beverage_id?: string | null;
}

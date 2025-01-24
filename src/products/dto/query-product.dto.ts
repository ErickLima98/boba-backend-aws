import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/core/commons/common-query.dto';

export class ProductQueryDto extends CommonQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Finds products by name',
    example: 'Grape',
  })
  readonly name?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Finds products by franchise',
    example: 'Grape',
  })
  readonly franchise_id?: string | null;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Finds products by inactive field',
    example: 'Grape',
  })
  readonly is_inactive?: boolean | null;
}

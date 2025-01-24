import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/core/commons/common-query.dto';

export class FoodQueryDto extends CommonQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Finds foods by name',
    example: 'Soup',
  })
  readonly name?: string | null;
}

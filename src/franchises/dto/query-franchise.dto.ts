import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/core/commons/common-query.dto';

export class FranchiseQueryDto extends CommonQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Filter franchises by name',
    example: 'Franchise 1',
  })
  readonly name?: string | null;
}

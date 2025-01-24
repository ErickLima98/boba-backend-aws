import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/core/commons/common-query.dto';

export class ExpensesQueryDto extends CommonQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Finds expenses by name',
    example: 'internet',
  })
  readonly name?: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Finds expenses by franchise',
    example: '10',
  })
  readonly franchise_id?: string | null;
}

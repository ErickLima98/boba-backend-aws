import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/core/commons/common-query.dto';

export class SalesQueryDto extends CommonQueryDto {
  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    description: 'Find sales by cash or by card',
    example: true,
  })
  readonly is_cash: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Find sales by user id',
    example: '10',
  })
  readonly user_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Find sales by user id',
    example: '10',
  })
  readonly created_at: Date;
}

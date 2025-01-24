import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RangeDaysDTO {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Start date to filter sales data',
    example: '2024-08-11',
  })
  start_date: string | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Start date to filter sales data',
    example: '2024-08-11',
  })
  end_date: string | null;
}

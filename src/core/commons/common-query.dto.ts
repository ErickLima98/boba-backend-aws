import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CommonQueryDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Positive limit of entries per page.',
    example: 10,
  })
  limit?: number | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Positive page to display',
    example: 1,
  })
  page?: number | null;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: `String that indicates how to order the entries, following by a colon, 
      and then a string with the order value ('asc' | 'desc' | 'ASC' | 'DESC')`,
    example: 'created_at:desc,updated_at:asc',
  })
  order_by?: string | null;
}

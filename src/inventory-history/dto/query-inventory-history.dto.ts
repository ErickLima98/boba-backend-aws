import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/core/commons/common-query.dto';

export class InventoryHistoryQueryDto extends CommonQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Finds inventory history by product id',
    example: '10',
  })
  readonly product_id: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Finds inventroy history by user id that register it',
    example: '2',
  })
  readonly user_id: string;
}

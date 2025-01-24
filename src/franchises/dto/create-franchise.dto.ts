import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFranchiseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Name of the franchise',
    example: 'Franchise 1',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Phisical address of the franchise',
    example: '5th avenue',
  })
  readonly franchise_address: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'ID of the owner of the franchise',
    example: '1',
  })
  readonly owner_id: string;
}

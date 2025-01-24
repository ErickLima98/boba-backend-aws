import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CommonQueryDto } from 'src/core/commons/common-query.dto';

export class UserQueryDto extends CommonQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Find users by email',
    example: 'user@email.com',
  })
  readonly email: string;
}

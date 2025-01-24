import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Email to use for sign in',
    example: 'john@email.com',
  })
  readonly full_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @ApiProperty({
    description: 'Email to use for sign in',
    example: 'john@email.com',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'Password to use for sign in',
    example: 'password',
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @ApiProperty({
    description: 'Role User (enum values: SA, A, G, O)',
    example: 'O',
    enum: ['SA', 'A', 'G', 'O'],
  })
  readonly role: string;
}

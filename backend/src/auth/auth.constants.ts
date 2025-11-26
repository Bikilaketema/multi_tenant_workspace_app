export const BETTER_AUTH_INSTANCE = 'BETTER_AUTH_INSTANCE';

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'user@acme.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password (min 8 chars)' })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: 'Acme User', description: 'User name (optional)', required: false })
  name?: string; 
}

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false, default: true, description: 'If false, session ends when browser closes.' })
  rememberMe?: boolean;
}
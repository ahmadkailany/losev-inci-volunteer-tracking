import { IsEmail, IsString, MinLength, IsEnum, IsOptional, IsPhoneNumber } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  name: string;

  @IsEnum(Role)
  role: Role = Role.STUDENT;

  @IsPhoneNumber('TR')
  phone: string;

  @IsString()
  school: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  grade?: string;

  @IsOptional()
  @IsString()
  tcId?: string;

  @IsOptional()
  parentConsent?: boolean;

  @IsOptional()
  @IsEmail()
  parentEmail?: string;
}

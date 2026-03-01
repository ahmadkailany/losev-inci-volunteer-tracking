import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ActivityType } from '@prisma/client';

export class CreateActivityDto {
  @IsDateString()
  date: string;

  @IsEnum(ActivityType)
  type: ActivityType;

  @IsNumber()
  @Min(0.5)
  @Max(24)
  hours: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  docUrl?: string;
}

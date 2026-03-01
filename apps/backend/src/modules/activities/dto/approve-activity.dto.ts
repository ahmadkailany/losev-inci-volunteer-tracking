import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from '@prisma/client';

export class ApproveActivityDto {
  @IsEnum(Status)
  status: Status;

  @IsOptional()
  @IsString()
  comment?: string;
}

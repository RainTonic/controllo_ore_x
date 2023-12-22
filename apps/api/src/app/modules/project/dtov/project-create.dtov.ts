import { ProjectCreateDto } from '@api-interfaces';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ProjectCreateDtoV implements ProjectCreateDto {
  @IsString()
  name: string;

  @IsUUID()
  customerId: string;

  @IsUUID()
  @IsOptional()
  projectManagerId?: string;

  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsNumber()
  hoursBudget?: number;

  @IsOptional()
  @IsNumber()
  billableHoursBudget?: number;

  @IsOptional()
  @IsDate()
  deadline?: Date;

  @IsOptional()
  @IsDate()
  customerDeadline?: Date;
}

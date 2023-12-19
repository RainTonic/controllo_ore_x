import { ProjectUpdateDto } from '@api-interfaces';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class ProjectUpdateDtoV implements ProjectUpdateDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  customerId?: string;

  @IsUUID()
  @IsOptional()
  projectManagerId?: string;

  @IsOptional()
  @IsString()
  color?: string;

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

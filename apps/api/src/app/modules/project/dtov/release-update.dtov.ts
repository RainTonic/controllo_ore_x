import { ReleaseUpdateDto } from '@api-interfaces';
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class ReleaseUpdateDtoV implements ReleaseUpdateDto {
  @IsOptional() 
  @IsUUID()
  projectId: string;
  
  @IsOptional() 
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isCompleted: boolean;

  @IsOptional()
  @IsNumber()
  hoursBudget: number;

  @IsOptional()
  @IsNumber()
  billableHoursBudget: number;

  @IsOptional()
  @IsDate()
  deadline: Date;

  @IsOptional()
  @IsDate()
  managementDeadline: Date;

}

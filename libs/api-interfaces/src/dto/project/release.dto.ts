import { UserHoursReadDto } from '../user-hours/user-hours.dto';
import { ProjectReadDto } from './project.dto';

export interface ReleaseReadDto {
  _id: string;
  projectId: string;
  project?: ProjectReadDto;
  name: string;
  isCompleted: boolean;
  hoursBudget: number;
  billableHoursBudget: number;
  billedHours?: number;
  deadline: Date;
  managementDeadline: Date;
  userHours: UserHoursReadDto[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

export interface ReleaseCreateDto {
  projectId: string;
  name: string;
  isCompleted: boolean;
  hoursBudget?: number;
  billableHoursBudget?: number;
  billedHours?: number;
  deadline: Date;
  managementDeadline: Date;
}

export interface ReleaseUpdateDto {
  projectId?: string;
  name?: string;
  isCompleted?: boolean;
  hoursBudget?: number;
  billableHoursBudget?: number;
  billedHours?: number;
  deadline?: Date;
  managementDeadline?: Date;
}

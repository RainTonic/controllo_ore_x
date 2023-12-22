import { CustomerReadDto } from '../customer/customer.dto';
import { UserReadDto } from '../user/user.dto';

export interface ProjectReadDto {
  _id: string;
  name: string;
  customerId: string;
  customer?: CustomerReadDto;
  projectManagerId?: string;
  projectManager?: UserReadDto;
  color?: string;
  hoursBudget?: number;
  billableHoursBudget?: number;
  deadline?: Date;
  customerDeadline?: Date;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

export interface ProjectCreateDto {
  name: string;
  customerId: string;
  color?: string;
  projectManagerId?: string;
  hoursBudget?: number;
  billableHoursBudget?: number;
  deadline?: Date;
  customerDeadline?: Date;
}

export interface ProjectUpdateDto {
  name?: string;
  customerId?: string;
  projectManagerId?: string;
  color?: string;
  hoursBudget?: number;
  billableHoursBudget?: number;
  deadline?: Date;
  customerDeadline?: Date;
}

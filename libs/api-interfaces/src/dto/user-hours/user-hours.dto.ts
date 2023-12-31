import { ReleaseReadDto } from '../project/release.dto';
import { UserReadDto } from '../user/user.dto';
import { HoursTagReadDto } from './hours-tag.dto';

export interface UserHoursReadDto {
  _id: string;
  userId: string;
  user?: UserReadDto;
  releaseId: string;
  release?: ReleaseReadDto
  hoursTagId: string;
  hoursTag?: HoursTagReadDto;
  date: Date;
  notes: string;
  hours: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

export interface UserHoursCreateDto {
  userId: string;
  releaseId: string;
  hoursTagId: string;
  date: Date;
  notes: string;
  hours: number;
}

export interface UserHoursUpdateDto {
  userId?: string;
  releaseId?: string;
  hoursTagId?: string;
  date?: Date;
  notes?: string;
  hours?: number;
}

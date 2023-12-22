import { ROLE } from '../../enums/role.enum';

export interface RoleReadDto {
  _id: string;
  name: ROLE;
  permissions: string;
  isModifiable: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  deletedAt?: Date | string;
}

export interface RoleCreateDto {
  name: ROLE;
  permissions: string;
}

export interface RoleUpdateDto {
  name?: ROLE;
  permissions?: string;
}

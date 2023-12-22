import { ROLE, RoleCreateDto } from '@api-interfaces';
import { IsString } from 'class-validator';

export class RoleCreateDtoV implements RoleCreateDto {
  @IsString()
  name: ROLE;

  @IsString()
  permissions: string;

  //I permessi del ruolo sono gestiti tramite un JSON.stringify()
}

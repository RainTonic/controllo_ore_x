import { ROLE } from '@api-interfaces';
import { BaseEntityTemplate } from '@shared/classes/base-entity-template.class';
import { Column, Entity } from 'typeorm';

@Entity()
export class Role extends BaseEntityTemplate {
  @Column({ type: 'enum', enum: ROLE })
  name: ROLE;

  @Column('simple-json')
  permissions: Array<{
    description: string;
    active: boolean;
  }>;

  @Column({ default: true })
  isModifiable: boolean;
}

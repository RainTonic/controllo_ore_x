import { Customer } from '@modules/customer/entities/customer.entity';
import { User } from '@modules/user/entities/user.entity';
import { BaseEntityTemplate } from '@shared/classes/base-entity-template.class';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Project extends BaseEntityTemplate {
  @Column()
  name: string;

  @ManyToOne(() => Customer, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'customerId' })
  customer?: Customer;
  @Column()
  customerId: string;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'projectManagerId' })
  projectManager?: User;
  @Column({ nullable: true })
  projectManagerId: string;

  @Column()
  color: string;

  @Column({ nullable: true })
  hoursBudget: number;

  @Column({ nullable: true })
  billableHoursBudget: number;

  @Column({ nullable: true })
  deadline: Date;

  @Column({ nullable: true })
  customerDeadline: Date;
}

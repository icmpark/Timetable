import { ScheduleEntity } from '../../../../schedule/infra/db/entity/schedule.entity';
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity extends BaseEntity {
  @PrimaryColumn({ length: 60 })
  userId: string;

  @Column({ length: 60 })
  userName: string;

  @Column({type: "text"})
  password: string;
}
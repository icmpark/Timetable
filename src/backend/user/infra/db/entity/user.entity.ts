import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('User')
export class UserEntity {
  @PrimaryColumn()
  userId: string;

  @Column({ length: 60 })
  userName: string;

  @Column({type: "text"})
  password: string;
}
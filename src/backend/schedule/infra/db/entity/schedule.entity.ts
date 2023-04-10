import { UserEntity } from "src/backend/user/infra/db/entity/user.entity";
import { Column, BaseEntity, Entity, ManyToMany, ManyToOne, PrimaryColumn, JoinTable, JoinColumn} from "typeorm";

@Entity('Schedule')
export class ScheduleEntity extends BaseEntity  {
    @PrimaryColumn()
    id: string;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 400 })
    description: string;

    @Column('datetime')
    startDate: Date;

    @Column('datetime')
    endDate: Date;

    @ManyToOne(
        () => UserEntity,
        { nullable: false, onDelete: 'CASCADE', lazy: true}
    )
    createdUser: Promise<UserEntity>;
    
    @ManyToMany(
        (type) => UserEntity,
        { onDelete: 'CASCADE', lazy: true }
    )
    @JoinTable()
    assignedUser: Promise<UserEntity[]>;
}
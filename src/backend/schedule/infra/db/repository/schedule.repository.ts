
import { Inject, Injectable } from "@nestjs/common";
import { Schedule } from "../../../domain/schedule";
import { IScheduleRepository } from "../../../domain/repository/ischedule.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { ScheduleEntity } from "../entity/schedule.entity";
import { DataSource, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { UserEntity } from "../../../../user/infra/db/entity/user.entity";
import { ScheduleFactory } from "../../../../schedule/domain/schedule.factory";
import authConfig from "../../../../config/authConfig";
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ScheduleRepository implements IScheduleRepository {
    constructor (
        @InjectRepository(ScheduleEntity) private scheduleRepostory: Repository<ScheduleEntity>,
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
        private scheduleFactory: ScheduleFactory,
        private dataSource: DataSource,
    ) { }


    async create(schedule: Schedule): Promise<void> {
        const { id, createdBy, title, description, startDate, endDate } = schedule;

        await this.dataSource.transaction<void>(async manager => {
            const scheduleEntity = new ScheduleEntity();
            scheduleEntity.id = id;
            scheduleEntity.createdBy = createdBy;
            scheduleEntity.title = title;
            scheduleEntity.description = description;
            scheduleEntity.startDate = startDate;
            scheduleEntity.endDate = endDate;
            await manager.save(scheduleEntity);
        });

    }
    async update(id: string, title?: string, description?: string, addUser?: string, deleteUser?: string): Promise<void> {
        await this.dataSource.transaction<void>(async manager => {
            const schedule = await manager.findOneBy(ScheduleEntity, {id: id});

            if (title != undefined)
                schedule.title = title;
                
            if (description != undefined)
                schedule.description = description;

            if (addUser != undefined)
                (await schedule.assignedUser).push({userId: addUser} as UserEntity);

            if (deleteUser != undefined)
                schedule.assignedUser = Promise.resolve((await schedule.assignedUser).filter((value: UserEntity) => value.userId != deleteUser));

            await manager.save(schedule);
        });


    }
    async delete(id: string): Promise<void> {
        await this.scheduleRepostory.delete({id: id});
    }

    async isAssigned(id: string, userId: string): Promise<boolean> {
        return await this.scheduleRepostory.exist({
            relations: ['assignedUser'],
            where: {id: id, assignedUser: {userId: userId}}
        });
    }

    async isAssignable(id: string, userId: string): Promise<boolean> {
        const schedule = await this.findOne(id);

        return !await this.scheduleRepostory.exist({
            relations: ['assignedUser'],
            where: [
                { 
                    startDate: LessThanOrEqual(schedule.endDate), 
                    endDate: MoreThanOrEqual(schedule.startDate), 
                    assignedUser: { userId: userId } 
                },
                { id: id, assignedUser: { userId: userId } }  
            ]
        });
    }
    async findOne(id: string): Promise<Schedule | null> {
        const scheduleEntity: ScheduleEntity | null = await this.scheduleRepostory.findOne(
            {
                relations: ['assignedUser'],
                where: {id: id},
                select: {assignedUser: {userId: true} }
            }
        );
        
        if (scheduleEntity == null)
            return null;

        return this.scheduleFactory.reconstitute(
            scheduleEntity.id,
            scheduleEntity.createdBy,
            scheduleEntity.title,
            scheduleEntity.description,
            scheduleEntity.startDate,
            scheduleEntity.endDate,
            (await scheduleEntity.assignedUser).map((user: UserEntity) => user.userId)
        );
    }
    private convertEntityToObject = (scheduleEntity: ScheduleEntity): Schedule => this.scheduleFactory.reconstitute(
        scheduleEntity.id,
        scheduleEntity.createdBy,
        scheduleEntity.title,
        scheduleEntity.description,
        scheduleEntity.startDate,
        scheduleEntity.endDate
    );

    async findAll(): Promise<Schedule[]> {
        const scheduleEntities: ScheduleEntity[] = await this.scheduleRepostory.find();
        return scheduleEntities.map(this.convertEntityToObject);

    }
    async findCreatedBy(userId: string): Promise<Schedule[]> {
        const scheduleEntities: ScheduleEntity[] = await this.scheduleRepostory.findBy({createdBy: userId});
        return scheduleEntities.map(this.convertEntityToObject);
    }
    async findUserAssigned(userId: string): Promise<Schedule[]> {
        const scheduleEntities: ScheduleEntity[] = await this.scheduleRepostory.find({
            relations: [ 'assignedUser' ],
            where: { 'assignedUser': { userId: userId } }
        })
        return scheduleEntities.map(this.convertEntityToObject);
    }

}
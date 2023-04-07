import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindScheduleQuery, FindAllScheduleQuery, FindScheduleCreatedByUserQuery, FindScheduleUserAssignedQuery } from './find-schedule.query'
import { IScheduleRepository } from '../../domain/repository/ischedule.repository';
import { Schedule } from '../../domain/schedule';

@QueryHandler(FindScheduleQuery)
export class FindScheduleQueryHandler implements IQueryHandler<FindScheduleQuery> {
    constructor(
        @Inject('ScheduleRepository') private scheduleRepository: IScheduleRepository,
    ) { }

    async execute(query: FindScheduleQuery): Promise<Schedule | null> {
        const { id } = query;
        return await this.scheduleRepository.findOne(id);
    }
}
@QueryHandler(FindAllScheduleQuery)
export class FindAllScheduleQueryHandler implements IQueryHandler<FindAllScheduleQuery> {
    constructor(
        @Inject('ScheduleRepository') private scheduleRepository: IScheduleRepository,
    ) { }

    async execute(query: FindAllScheduleQuery): Promise<Schedule[]> {
        return await this.scheduleRepository.findAll();
    }
}

@QueryHandler(FindScheduleCreatedByUserQuery)
export class FindScheduleCreatedByUserQueryHandler implements IQueryHandler<FindScheduleCreatedByUserQuery> {
    constructor(
        @Inject('ScheduleRepository') private scheduleRepository: IScheduleRepository,
    ) { }

    async execute(query: FindScheduleCreatedByUserQuery): Promise<Schedule[]> {
        const { userId } = query;
        return await this.scheduleRepository.findCreatedBy(userId);
    }
}

@QueryHandler(FindScheduleUserAssignedQuery)
export class FindScheduleUserAssignedQueryHandler implements IQueryHandler<FindScheduleUserAssignedQuery> {
    constructor(
        @Inject('ScheduleRepository') private scheduleRepository: IScheduleRepository,
    ) { }

    async execute(query: FindScheduleUserAssignedQuery): Promise<Schedule[]> {
        const { userId } = query;
        return await this.scheduleRepository.findUserAssigned(userId);
    }
}
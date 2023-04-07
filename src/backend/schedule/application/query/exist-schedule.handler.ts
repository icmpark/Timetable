import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { isUserAssignedScheduleQuery, isScheduleAssignableQuery } from './exist-schedule.query'
import { IScheduleRepository } from '../../domain/repository/ischedule.repository';

@QueryHandler(isUserAssignedScheduleQuery)
export class isUserAssignedScheduleQueryHandler implements IQueryHandler<isUserAssignedScheduleQuery> {
    constructor(
        @Inject('ScheduleRepository') private scheduleRepository: IScheduleRepository,
    ) { }

    async execute(query: isUserAssignedScheduleQuery): Promise<boolean> {
        const { id, userId } = query;
        return await this.scheduleRepository.isAssigned(id, userId);
    }
}
@QueryHandler(isScheduleAssignableQuery)
export class isScheduleAssignableQueryHandler implements IQueryHandler<isScheduleAssignableQuery> {
    constructor(
        @Inject('ScheduleRepository') private scheduleRepository: IScheduleRepository,
    ) { }

    async execute(query: isScheduleAssignableQuery): Promise<boolean> {
        const { id, userId } = query;
        return await this.scheduleRepository.isAssignable(id, userId);
    }
}

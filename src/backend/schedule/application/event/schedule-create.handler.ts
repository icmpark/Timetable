import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScheduleCreatedEvent } from '../../domain/event/schedule-create.event';
import { IScheduleRepository } from '../../domain/repository/ischedule.repository';


@EventsHandler(ScheduleCreatedEvent)
export class ScheduleCreatedEventHandler implements IEventHandler<ScheduleCreatedEvent> {
    constructor(
        @Inject('ScheduleRepository') private scheduleRepository: IScheduleRepository,
    ) { }

    async handle(event: ScheduleCreatedEvent) {
        switch (event.name) {
            case ScheduleCreatedEvent.name: {
                const { schedule } = event as ScheduleCreatedEvent;
                await this.scheduleRepository.create(schedule);
                break;
            }
            default:
                break;
        }
    }
}
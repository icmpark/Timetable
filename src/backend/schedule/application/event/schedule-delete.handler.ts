import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScheduleDeletedEvent } from '../../domain/event/schedule-delete.event';
import { IScheduleRepository } from '../../domain/repository/ischedule.repository';


@EventsHandler(ScheduleDeletedEvent)
export class ScheduleDeletedEventHandler implements IEventHandler<ScheduleDeletedEvent> {
    constructor(
        @Inject('ScheduleRepository') private scheduleRepository: IScheduleRepository,
    ) { }

    async handle(event: ScheduleDeletedEvent) {
        switch (event.name) {
            case ScheduleDeletedEvent.name: {
                const { id } = event as ScheduleDeletedEvent;
                await this.scheduleRepository.delete(id);
                break;
            }
            default:
                break;
        }
    }
}
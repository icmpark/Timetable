import { Inject } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ScheduleUpdatedEvent } from '../../domain/event/schedule-update.event';
import { IScheduleRepository } from '../../domain/repository/ischedule.repository';


@EventsHandler(ScheduleUpdatedEvent)
export class ScheduleUpdatedEventHandler implements IEventHandler<ScheduleUpdatedEvent> {
    constructor(
        @Inject('ScheduleRepository') private scheduleRepository: IScheduleRepository,
    ) { }

    async handle(event: ScheduleUpdatedEvent) {
        switch (event.name) {
            case ScheduleUpdatedEvent.name: {
                const { id, title, description, addUser, removeUser } = event as ScheduleUpdatedEvent;
                await this.scheduleRepository.update(id, title, description, addUser, removeUser);
                break;
            }
            default:
                break;
        }
    }
}
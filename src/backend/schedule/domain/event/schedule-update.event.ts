import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from '../../../utils/event/cqrs.event';

export class ScheduleUpdatedEvent extends CqrsEvent implements IEvent {
    constructor(
        readonly id: string,
        readonly title?: string,
        readonly description?: string,
        readonly addUser?: string,
        readonly removeUser?: string
    ) {
        super(ScheduleUpdatedEvent.name);
    }
}
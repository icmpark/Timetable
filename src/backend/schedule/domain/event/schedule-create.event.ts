import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from '../../../utils/event/cqrs.event';
import { Schedule } from '../schedule';

export class ScheduleCreatedEvent extends CqrsEvent implements IEvent {
    constructor(
        readonly schedule: Schedule
    ) {
        super(ScheduleCreatedEvent.name);
    }
}
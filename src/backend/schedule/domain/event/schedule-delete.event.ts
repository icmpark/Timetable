import { IEvent } from '@nestjs/cqrs';
import { CqrsEvent } from '../../../utils/event/cqrs.event';

export class ScheduleDeletedEvent extends CqrsEvent implements IEvent {
    constructor(
        readonly id: string
    ) {
        super(ScheduleDeletedEvent.name);
    }
}
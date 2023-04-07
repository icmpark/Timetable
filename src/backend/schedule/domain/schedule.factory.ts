import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Schedule } from './schedule';
import { ScheduleCreatedEvent } from './event/schedule-create.event';
import { ScheduleUpdatedEvent } from './event/schedule-update.event';
import { ScheduleDeletedEvent } from './event/schedule-delete.event';

@Injectable()
export class ScheduleFactory {
    constructor(private eventBus: EventBus) { }
    

    create (
        id: string,
        createdBy: string,
        title: string,
        description: string,
        startTime: Date,
        endTime: Date
    ): Schedule {
        const schedule = new Schedule(
            id,
            createdBy,
            title,
            description,
            startTime,
            endTime
        );
        this.eventBus.publish(new ScheduleCreatedEvent(schedule));
        return schedule;
    }

    update(
        id: string,
        title?: string,
        description?: string,
        addUser?: string,
        removeUser?: string
    ) {
        const event = new ScheduleUpdatedEvent(id, title, description, addUser, removeUser);
        this.eventBus.publish(event);
    }

    delete(
        id: string
    ) {
        this.eventBus.publish(new ScheduleDeletedEvent(id));
    }
    
    reconstitute (
        id: string,
        createdBy: string,
        title: string,
        description: string,
        startTime: Date,
        endTime: Date
    ): Schedule {
        const schedule = new Schedule(
            id,
            createdBy,
            title,
            description,
            startTime,
            endTime
        );
        return schedule;
    }


}
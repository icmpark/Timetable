import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateScheduleCommand } from './create-schedule.command';
import { ScheduleFactory } from '../../domain/schedule.factory';

@Injectable()
@CommandHandler(CreateScheduleCommand)
export class CreateScheduleCommandHandler implements ICommandHandler<CreateScheduleCommand> {
    constructor(
        private scheduleFactory: ScheduleFactory,
    ) { }

    async execute(command: CreateScheduleCommand): Promise<void> {
        const { id, createdBy, title, description, startTime, endTime } = command;
        this.scheduleFactory.create(id, createdBy, title, description, startTime, endTime);
    }
}
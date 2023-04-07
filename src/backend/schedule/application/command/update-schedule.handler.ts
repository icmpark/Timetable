import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateScheduleCommand } from './update-schedule.command';
import { ScheduleFactory } from '../../domain/schedule.factory';

@Injectable()
@CommandHandler(UpdateScheduleCommand)
export class UpdateScheduleCommandHandler implements ICommandHandler<UpdateScheduleCommand> {
    constructor(
        private scheduleFactory: ScheduleFactory,
    ) { }

    async execute(command: UpdateScheduleCommand): Promise<void> {
        const { id, title, description, addUser, removeUser } = command;
        this.scheduleFactory.update(id, title, description, addUser, removeUser);
    }
}
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteScheduleCommand } from './delete-schedule.command';
import { ScheduleFactory } from '../../domain/schedule.factory';

@Injectable()
@CommandHandler(DeleteScheduleCommand)
export class DeleteScheduleCommandHandler implements ICommandHandler<DeleteScheduleCommand> {
    constructor(
        private scheduleFactory: ScheduleFactory,
    ) { }

    async execute(command: DeleteScheduleCommand): Promise<void> {
        const { id } = command;
        this.scheduleFactory.delete(id);
    }
}
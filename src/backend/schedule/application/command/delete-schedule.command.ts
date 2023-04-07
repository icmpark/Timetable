import { ICommand } from '@nestjs/cqrs';

export class DeleteScheduleCommand implements ICommand {
  constructor(
    readonly id: string
  ) { }
}
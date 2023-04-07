import { ICommand } from '@nestjs/cqrs';

export class UpdateScheduleCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly title?: string,
    readonly description?: string,
    readonly addUser?: string,
    readonly removeUser?: string
  ) { }
}
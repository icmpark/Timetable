import { ICommand } from '@nestjs/cqrs';

export class CreateScheduleCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly createdBy: string,
    readonly title: string,
    readonly description: string,
    readonly startDate: Date,
    readonly endDate: Date
  ) { }
}
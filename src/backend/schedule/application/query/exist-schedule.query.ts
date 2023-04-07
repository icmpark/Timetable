import { IQuery } from '@nestjs/cqrs';

export class isUserAssignedScheduleQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly userId: string
  ) { }
}

export class isScheduleAssignableQuery implements IQuery {
  constructor(
    readonly id: string,
    readonly userId: string
  ) { }
}
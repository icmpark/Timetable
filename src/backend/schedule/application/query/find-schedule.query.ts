import { IQuery } from '@nestjs/cqrs';

export class FindScheduleQuery implements IQuery {
  constructor(
    readonly id: string
  ) { }
}

export class FindAllScheduleQuery implements IQuery {
  constructor(
  ) { }
}

export class FindScheduleCreatedByUserQuery implements IQuery {
  constructor(
    readonly userId: string
  ) { }
}

export class FindScheduleUserAssignedQuery implements IQuery {
  constructor(
    readonly userId: string
  ) { }
}



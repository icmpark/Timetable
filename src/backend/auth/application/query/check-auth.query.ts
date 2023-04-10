import { IQuery } from '@nestjs/cqrs';

export class CheckAuthQuery implements IQuery {
  constructor(
    readonly request
  ) { }
}
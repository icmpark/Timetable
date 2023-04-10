import { ICommand } from '@nestjs/cqrs';

export class CreateAuthCommand implements ICommand {
  constructor(
    readonly request
  ) { }
}
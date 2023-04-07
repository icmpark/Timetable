import { ICommand } from '@nestjs/cqrs';

export class UpdateUserCommand implements ICommand {
  constructor(
    readonly userId: string,
    readonly userName?: string,
    readonly password?: string
  ) { }
}
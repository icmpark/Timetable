import { Inject, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthCommand } from './create-auth.command';
import { IAuthAdapter } from '../../domain/adapter/iauth.adapter';

@Injectable()
@CommandHandler(CreateAuthCommand)
export class CreateAuthCommandHandler implements ICommandHandler<CreateAuthCommand> {
    constructor(
        @Inject('AuthAdapter') private authAdapter: IAuthAdapter,
    ) { }

    async execute(command: CreateAuthCommand): Promise<void> {
        const { request } = command;
        await this.authAdapter.create(request);
    }
}
import { Module } from '@nestjs/common';
import { UserController } from './interface/user.controller';
import { UserFactory } from './domain/user.factory';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateUserCommandHandler } from './application/command/user-create.handler';
import { DeleteUserCommandHandler } from './application/command/user-delete.handler';
import { UpdateUserCommandHandler } from './application/command/user-update.handler';
import { FindUserQueryHandler } from './application/query/user-find.handler';
import { UserCreatedEventHandler } from './application/event/user-create.handler';
import { UserDeletedEventHandler } from './application/event/user-delete.handler';
import { UserUpdatedEventHandler } from './application/event/user-update.handler';
import { UserRepository } from './infra/db/repository/user.repository';

const commandHandlers = [
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  UpdateUserCommandHandler
];

const queryHandlers = [
  FindUserQueryHandler
];

const eventHandlers = [
  UserCreatedEventHandler,
  UserDeletedEventHandler,
  UserUpdatedEventHandler
];

const factories = [
  UserFactory
];

const repositories = [
  { provide: 'UserRepository', useClass: UserRepository },
];

@Module({
  imports: [
    CqrsModule
  ],
  controllers: [UserController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...factories,
    ...repositories,
  ],
})
export class UserModule { }
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './infra/adapter/strategy/local.strategy';
import { LocalSerializer } from './infra/adapter/serializer/local.serializer';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthController } from './interface/auth.controller';
import { CheckAuthQueryHandler } from './application/query/check-auth.handler';
import { CreateAuthCommandHandler } from './application/command/create-auth.handler';
import { AuthAdapter } from './infra/adapter/auth.adapter';

const commandHandlers = [
  CreateAuthCommandHandler
];
const queryHandlers = [
  CheckAuthQueryHandler
];

const adapters = [
  { provide: 'AuthAdapter', useClass: AuthAdapter },
];


@Module({
  imports: [
    PassportModule.register({session: true}),
    CqrsModule
  ],
  providers: [
    LocalStrategy,
    LocalSerializer,
    ...queryHandlers,
    ...commandHandlers,
    ...adapters
  ],
  controllers: [ AuthController ]
})
export class AuthModule {}
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './application/strategy/local.strategy';
import { LocalSerializer } from './application/serializer/local.serializer';
import { UserModule } from '../user/user.module';
import { VerifyAuthQueryHandler } from './application/query/verify-auth.handler';
import { CqrsModule } from '@nestjs/cqrs';

const queryHandlers = [
    VerifyAuthQueryHandler
];

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule, 
    CqrsModule
  ],
  providers: [
    LocalStrategy,
    LocalSerializer,
    ...queryHandlers
  ]
})
export class AuthModule {}
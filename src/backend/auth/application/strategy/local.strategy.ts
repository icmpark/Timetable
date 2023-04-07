import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { VerifyAuthQuery } from '../query/verify-auth.query';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private queryBus: QueryBus) {
    super({usernameField:'userId', passwordField:'password'});
  }

  async validate(userId: string, password: string): Promise<any> {
    const user = await this.queryBus.execute(new VerifyAuthQuery(userId, password));
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { VerifyUserQuery } from '../../../../user/application/query/verify-user.query';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private queryBus: QueryBus) {
    super({usernameField:'userId', passwordField:'password'});
  }

  async validate(userId: string, password: string): Promise<any> {
    const user = await this.queryBus.execute(new VerifyUserQuery(userId, password));
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
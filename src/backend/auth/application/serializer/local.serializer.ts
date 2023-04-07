import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '../../../user/domain/user';
import { FindUserQuery } from '../../../user/application/query/user-find.query';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly queryBus: QueryBus) {
    super();
  }

  serializeUser(user: User, done: Function) {
    done(null, user.userId);
  }

  async deserializeUser(userId: string, done: Function) {
    const user: User = await this.queryBus.execute(new FindUserQuery(userId));
    if (!user) done('Unexpected error in deserializing');
    done(null, user);
  }
}
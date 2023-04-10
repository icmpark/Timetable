import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { QueryBus } from '@nestjs/cqrs';
import { CheckAuthQuery } from '../../../auth/application/query/check-auth.query';

@Injectable()
export class UserGuard implements CanActivate {
  constructor (private queryBus: QueryBus) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isAuth = await this.queryBus.execute(new CheckAuthQuery(request));

    if (!isAuth)
        return false;
        
    const user: User = request.user;
    const userId: string = request.params.userId;
    return userId == user.userId;
  }
}
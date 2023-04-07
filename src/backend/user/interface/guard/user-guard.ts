import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.isAuthenticated())
        return false;
        
    const user: User = request.user;
    const userId: string = request.params.userId;
    return userId == user.userId;
  }
}
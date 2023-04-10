import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs";
import { CheckAuthQuery } from "../../backend/auth/application/query/check-auth.query";

@Injectable()
export class AuthRenderGuard implements CanActivate {
  constructor (private queryBus: QueryBus) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const isAuth = await this.queryBus.execute(new CheckAuthQuery(request));

    if (!isAuth)
      response.redirect(301, '/login');
    
    return isAuth;
  }
}
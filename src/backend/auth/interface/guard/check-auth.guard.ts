import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { QueryBus } from "@nestjs/cqrs";
import { CheckAuthQuery } from "../../application/query/check-auth.query";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor (
        private queryBus: QueryBus
    ) {  }


  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    return await this.queryBus.execute(new CheckAuthQuery(request));
  }
}


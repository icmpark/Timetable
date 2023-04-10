import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { CommandBus } from "@nestjs/cqrs";
import { AuthGuard } from '@nestjs/passport';
import { CreateAuthCommand } from "../../application/command/create-auth.command";


@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor (
    private commandBus: CommandBus
  ) { super(); }

  async canActivate(context: ExecutionContext): Promise<boolean> {
      const result = (await super.canActivate(context)) as boolean;
      if (result)
      {
          const request = context.switchToHttp().getRequest();
          await this.commandBus.execute(new CreateAuthCommand(request));
      }
      return result;
  }
}


import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamPair = createParamDecorator(
  (data: string[], ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const [first, second] = data;
    return [request.params[first], request.params[second]];
  }
);
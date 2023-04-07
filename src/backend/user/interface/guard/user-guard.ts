import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private queryBus: QueryBus
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        return true;
    }

    private validateRequest(request: any, verify_result: string): boolean {
        const request_id: string = request.params.userId;
        return request_id == verify_result;
    };
}
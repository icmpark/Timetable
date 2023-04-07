import { Injectable, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { User } from '../../../user/domain/user';
import { Schedule } from '../../domain/schedule';
import { FindScheduleQuery } from '../../application/query/find-schedule.query';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Injectable()
export class GroupGuard implements CanActivate {
    constructor (
        private queryBus: QueryBus,
        private reflector: Reflector
    ) {  }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const handler = context.getHandler();

        if (!request.isAuthenticated())
            return false;
            
        const user: User = request.user;
        return await this.validateRequest(handler, request, user.userId);
    }

    private async validateRequest(handler: Function, request: any, authUserId: string): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', handler);
        const scheduleId = request.params.scheduleId;
        let schedule: Schedule = null;
        const userId = request.body.nUserId ?? request.body.userId;

        if (scheduleId)
            schedule = await this.queryBus.execute(new FindScheduleQuery(scheduleId))

        const results = roles.map((value: string): boolean => {
            if (value == 'auth')
                return true;
            else if (value == 'userself')
                return authUserId == userId;
            else if (value == 'owner')
                return schedule && schedule.createdBy == authUserId;
            else
                return false;
        });

        return results.some((value) => value);
  }
}
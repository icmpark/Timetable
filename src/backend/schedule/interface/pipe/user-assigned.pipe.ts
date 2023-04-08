import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { isUserAssignedScheduleQuery } from '../../application/query/exist-schedule.query';
@Injectable()
export class UserAssigned implements PipeTransform<any> {
    constructor(private queryBus: QueryBus) { }

    async transform(value: string[], metadata: ArgumentMetadata) {
        const [_, user_metadata] = metadata.data;
        const [scheduleId, userId] = value;

        const userAssigned: boolean = await this.queryBus.execute(new isUserAssignedScheduleQuery(scheduleId, userId));

        if (user_metadata == 'nUserId' && userAssigned)
            throw new BadRequestException({messages: 'User is assigned in schedule'});

        if (user_metadata == 'userId' && !userAssigned)
            throw new BadRequestException({messages: 'User is not assigned in schedule'});

        return userId;
    }
}
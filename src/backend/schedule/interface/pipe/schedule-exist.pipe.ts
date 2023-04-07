import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindScheduleQuery } from '../../application/query/find-schedule.query';

@Injectable()
export class ScheduleExisted implements PipeTransform<any> {
    constructor(private queryBus: QueryBus) { }

    async transform(value: string, metadata: ArgumentMetadata) {
        const data = metadata.data;
        const scheduleId = value;

        const query = new FindScheduleQuery(scheduleId);
        const scheduleExisted: boolean = (await this.queryBus.execute(query)) != null;

        if (data == 'groupId' && !scheduleExisted)
            throw new BadRequestException({messages: 'Schedule is not existed'});

        if (data == 'nGroupId' && scheduleExisted)
            throw new BadRequestException({messages: 'Schedule is existed'});

        return value;
    }
}
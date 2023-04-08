import { Body, Controller, Param, Post, Get, UseGuards, Delete, Put, Req, BadRequestException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateScheduleCommand } from '../application/command/create-schedule.command';
import { Auth } from '../../utils/deco/auth';
import { v4 } from 'uuid';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { DeleteScheduleCommand } from '../application/command/delete-schedule.command';
import { UpdateScheduleCommand } from '../application/command/update-schedule.command';
import { FindAllScheduleQuery, FindScheduleCreatedByUserQuery, FindScheduleQuery, FindScheduleUserAssignedQuery } from '../application/query/find-schedule.query';
import { Schedule } from '../domain/schedule';
import { isScheduleAssignableQuery } from '../application/query/exist-schedule.query';
import { Roles, ScheduleGuard } from './guard/schedule.guard';
import { ScheduleExisted } from './pipe/schedule-exist.pipe';
import { ParamPair } from './deco/param-pair.deco';
import { UserAssigned } from './pipe/user-assigned.pipe';
import { UpdateScheduleDto } from './dto/update-schedule.dto';

@UseGuards(ScheduleGuard)
@Controller('schedules')
export class ScheduleController {
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus
    ) { }
    
    private scheduleConvert = (schedule: Schedule): {[key: string]: any} => Object({
        id: schedule.id,
        title: schedule.title,
        description: schedule.description,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
    })

    @Roles('auth')
    @Get('/')
    async findAllSchedules(): Promise<{[key: string]: any}[]> {
        const schedules: Schedule[] = await this.queryBus.execute(new FindAllScheduleQuery());
        return schedules.map(this.scheduleConvert);
    }


    @Roles('auth')
    @Get('/assigned')
    async findAssignedSchedules(@Auth('userId') userId: string): Promise<{[key: string]: any}[]> {
        const schedules: Schedule[] = await this.queryBus.execute(new FindScheduleUserAssignedQuery(userId));
        return schedules.map(this.scheduleConvert);
    }

    @Roles('auth')
    @Get('/created')
    async findCreatedSchedules(@Auth('userId') userId: string): Promise<{[key: string]: any}[]> {
        const schedules: Schedule[] = await this.queryBus.execute(new FindScheduleCreatedByUserQuery(userId));
        return schedules.map(this.scheduleConvert);
    }


    @Roles('auth')
    @Post('/')
    async createSchedule(
        @Auth('userId') userId: string,
        @Body() dto: CreateScheduleDto
    ): Promise<string> {
        const id = v4();
        const { title, description, startDate, endDate } = dto;
        const command = new CreateScheduleCommand(id, userId, title, description, startDate, endDate);
        this.commandBus.execute(command);
        return id;
    }

    @Roles('owner')
    @Delete('/:scheduleId')
    async deleteSchedule(
        @Param('scheduleId', ScheduleExisted) scheduleId: string,
        @Req() req
    ): Promise<void> {
        const command = new DeleteScheduleCommand(scheduleId);
        this.commandBus.execute(command);
    }

    @Roles('owner')
    @Put('/:scheduleId')
    async updateSchedule(
        @Param('scheduleId', ScheduleExisted) scheduleId: string,
        @Body() dto: UpdateScheduleDto
    ): Promise<void> {
        const { title, description } = dto;
        const command = new UpdateScheduleCommand(scheduleId, title, description);
        this.commandBus.execute(command);
    }

    @Roles('userself', 'owner')
    @Post('/:scheduleId/user/:nUserId')
    async assignSchedule(
        @Param('scheduleId', ScheduleExisted) scheduleId: string,
        @ParamPair(['scheduleId', 'nUserId'], UserAssigned) userId: string
    ): Promise<void> {
        if (!await this.queryBus.execute(new isScheduleAssignableQuery(scheduleId, userId)))
            throw new BadRequestException();
        const command = new UpdateScheduleCommand(scheduleId, null, null, userId);
        this.commandBus.execute(command);
    }


    @Roles('userself', 'owner')
    @Delete('/:scheduleId/user/:userId')
    async dropSchedule(
        @Param('scheduleId', ScheduleExisted) scheduleId: string,
        @ParamPair(['scheduleId', 'userId'], UserAssigned) userId: string
    ): Promise<void> {
        const command = new UpdateScheduleCommand(scheduleId, null, null, null, userId);
        this.commandBus.execute(command);
    }


    @Roles('owner')
    @Get('/:scheduleId')
    async findOneSchedule(
        @Param('scheduleId', ScheduleExisted) scheduleId: string
    ): Promise<{[key: string]: any}> {
        const query = new FindScheduleQuery(scheduleId);
        const schedule: Schedule = await this.queryBus.execute(query);
        
        return {
            title: schedule.title,
            description: schedule.description,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            assignedUser: schedule.assignedUser
        };
    }
}

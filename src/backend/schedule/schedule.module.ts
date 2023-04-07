import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleFactory } from './domain/schedule.factory';
import { ScheduleRepository } from './infra/db/repository/schedule.repository';
import { ScheduleCreatedEventHandler } from './application/event/schedule-create.handler';
import { ScheduleDeletedEventHandler } from './application/event/schedule-delete.handler';
import { ScheduleUpdatedEventHandler } from './application/event/schedule-update.handler';
import { CreateScheduleCommandHandler } from './application/command/create-schedule.handler';
import { UpdateScheduleCommandHandler } from './application/command/update-schedule.handler';
import { DeleteScheduleCommandHandler } from './application/command/delete-schedule.handler';
import { isUserAssignedScheduleQueryHandler } from './application/query/exist-schedule.handler';
import { isScheduleAssignableQuery } from './application/query/exist-schedule.query';
import { FindAllScheduleQueryHandler, FindScheduleCreatedByUserQueryHandler, FindScheduleQueryHandler, FindScheduleUserAssignedQueryHandler } from './application/query/find-schedule.handler';
import { ScheduleEntity } from './infra/db/entity/schedule.entity';
import { ScheduleController } from './interface/schedule.controller';


const commandHandlers = [
  CreateScheduleCommandHandler,
  UpdateScheduleCommandHandler,
  DeleteScheduleCommandHandler
];

const queryHandlers = [
  isUserAssignedScheduleQueryHandler,
  isScheduleAssignableQuery,
  FindAllScheduleQueryHandler,
  FindScheduleQueryHandler,
  FindScheduleUserAssignedQueryHandler,
  FindScheduleCreatedByUserQueryHandler
];

const eventHandlers = [
  ScheduleCreatedEventHandler,
  ScheduleDeletedEventHandler,
  ScheduleUpdatedEventHandler
];

const factories = [
    ScheduleFactory
];

const repositories = [
  { provide: 'ScheduleRepository', useClass: ScheduleRepository },
];

@Module({
  imports: [
    TypeOrmModule.forFeature([ScheduleEntity]),
    CqrsModule
  ],
  controllers: [ScheduleController],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...factories,
    ...repositories,
  ],
})
export class ScheduleModule { }
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleFactory } from './domain/schedule.factory';



const commandHandlers = [
];

const queryHandlers = [
];

const eventHandlers = [
];

const factories = [
    ScheduleFactory
];

const repositories = [
];

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    CqrsModule
  ],
  controllers: [],
  providers: [
    ...commandHandlers,
    ...queryHandlers,
    ...eventHandlers,
    ...factories,
    ...repositories,
  ],
})
export class ScheduleModule { }
import { Module } from '@nestjs/common';
import { ScheduleRenderController } from './schedule.controller';

@Module({
    controllers: [ScheduleRenderController]
})
export class ScheduleRenderModule {}

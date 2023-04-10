import { Module } from '@nestjs/common';
import { ScheduleRenderController } from './schedule.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../../backend/auth/auth.module';

@Module({
    imports: [
        CqrsModule
    ],
    controllers: [ScheduleRenderController]
})
export class ScheduleRenderModule {}

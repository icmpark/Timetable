import { Module } from '@nestjs/common';
import { UserRenderModule } from './user/user.module';
import { ScheduleRenderModule } from './schedule/schedule.module';

@Module({
  imports: [
    UserRenderModule,
    ScheduleRenderModule
  ]
})
export class FrontendModule {}

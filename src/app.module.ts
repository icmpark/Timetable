import { Module } from '@nestjs/common';
import { BackendModule } from './backend/backend.module';
import { FrontendModule } from './frontend/frontend.module';

@Module({
  imports: [BackendModule, FrontendModule]
})
export class AppModule {}

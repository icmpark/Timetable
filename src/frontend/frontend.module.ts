import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core'
import { UserRenderModule } from './user/user.module';

@Module({
  imports: [
    UserRenderModule
  ]
})
export class FrontendModule {}

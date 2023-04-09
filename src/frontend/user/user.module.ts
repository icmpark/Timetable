import { Module } from '@nestjs/common';
import { UserRenderController } from './user.controller';

@Module({
    controllers: [UserRenderController]
})
export class UserRenderModule {}

import { Module } from '@nestjs/common';
import { UserRenderController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../../backend/auth/auth.module';

@Module({
    imports: [
        CqrsModule
    ],
    controllers: [UserRenderController]
})
export class UserRenderModule {}

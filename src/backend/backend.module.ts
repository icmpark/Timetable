import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/dbConfig';
import authConfig from './config/authConfig';

@Module({
  imports: [UserModule,
    ConfigModule.forRoot({
      // envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [dbConfig, authConfig],
      isGlobal: true,
    })]
})
export class BackendModule {}

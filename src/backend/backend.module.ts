import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import dbConfig from './config/dbConfig';
import authConfig from './config/authConfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfigModule, DBConfigService} from './config/dbConfigModule';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';
import { RouterModule } from '@nestjs/core'

const controllerModules = [
  AuthModule,
  UserModule,
  ScheduleModule
];

@Module({
  imports: [
    ...controllerModules,
    RouterModule.register(
      controllerModules.map(
        (module) => ({
          path: '/v',
          module: module
        })
      )
    ),
    ConfigModule.forRoot({
      // envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      load: [dbConfig, authConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [DBConfigModule],
      inject: [DBConfigService],
      useFactory: (conf: DBConfigService) => conf.makeMySQLConfig(),
    })
  ]
})
export class BackendModule {}

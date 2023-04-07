import { NestApplication } from "@nestjs/core";
import { ConfigService } from '@nestjs/config';
import * as passport from 'passport';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import { Redis } from 'ioredis';
import { INestApplication } from "@nestjs/common";


export function initialize_session(app: INestApplication): void {
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('database.redis.port');
  const host = configService.get('database.redis.addr');
  const redisClient = new Redis({port:port, host:host});
  const redisStore = new RedisStore({client: redisClient});

  app.use(
    session({
      secret: configService.get('auth.secret_key'),  // 세션에 사용될 시크릿 값. 감춰두자.
      saveUninitialized: false,
      resave: false,
      store: redisStore,
      cookie: {
        httpOnly: true,
        // secure: true,
        maxAge: 360000,  //세션이 redis에 저장되는 기간은 maxAge로 조절한다.(ms)
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  
}
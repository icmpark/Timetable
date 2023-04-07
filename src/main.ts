import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { SECRET_KEY } from './backend/config/authConfig';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  
  app.use(cookieParser());

  app.use(
    session({
      secret: SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    }),
  );

  // app.enableCors(); 
  await app.listen(3000);
}
bootstrap();

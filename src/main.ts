import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { initialize_session } from './backend/utils/func/initialize-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  initialize_session(app);
  app.use(cookieParser());

  // app.enableCors(); 
  await app.listen(3000);
}
bootstrap();

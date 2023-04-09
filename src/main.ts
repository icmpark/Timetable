import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import { initialize_session } from './backend/utils/func/initialize-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.use(cookieParser());
  initialize_session(app);
  app.useStaticAssets(join(__dirname, '..', 'src', 'frontend', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'src', 'frontend', 'views'));
  app.setViewEngine("ejs");

  // app.enableCors(); 
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //to store jwt in cookie------
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,POST,PATCH,DELETE,OPTIONS',
    credentials: true,
  });
  //----------
  await app.listen(3000);
}
bootstrap();

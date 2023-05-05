import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Response, Request } from 'express';

function globalMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log('This is the Middleware number1');
  next();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(globalMiddleware);
  await app.listen(3000);
}
bootstrap();

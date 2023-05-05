import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookMiddleware } from './book.middleware';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [],
  exports: [],
})
export class BookModule implements NestModule {
  constructor() {
    console.log('Book module');
  }
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BookMiddleware).forRoutes('book');
  }
}

import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';

@Module({
  imports: [BookModule, UsersModule],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {
  constructor() {
    console.log('app module');
  }
}

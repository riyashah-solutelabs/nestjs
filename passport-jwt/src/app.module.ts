import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportLocalStrategy } from './passport.local.strategy';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [PassportLocalStrategy],
  exports: [],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class UserModule {
  constructor(private readonly configService: ConfigService) {
    console.log(configService.get<number>('PORT'));
    // console.log(configService.get<boolean>('LOGGING'));
  }
}

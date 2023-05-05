import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
// import { dataSourceOptions } from 'db/data-source';
import { TypeOrmConfigService } from './config/typeorm.config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cookieSession = require('cookie-session');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const dbConfig = require('../db/data-source');
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const dbConfig = require('../ormconfig');
// const dbConfig = require('../db/data-source');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    // TypeOrmModule.forRoot(dbConfig),
    // TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    //to access configservice through DI
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       // type: 'sqlite',
    //       // database: config.get<string>('DB_NAME'),
    //       // synchronize: true,
    //       // entities: [User, Report],
    //       type: 'postgres',
    //       host: configService.get('DB_HOST'),
    //       port: +configService.get<number>('DB_PORT'),
    //       username: configService.get('DB_USERNAME'),
    //       password: configService.get('DB_PASSWORD'),
    //       database: configService.get('DB_NAME'),
    //       entities: [User, Report],
    //       synchronize: true,
    //     };
    //   },
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite',
    //   entities: [User, Report], //entity ma je store krisu te ahiya list thse
    //   synchronize: true,
    // }),
    UsersModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get('COOKIE_KEY')],
        }),
      )
      .forRoutes('*');
  }
}

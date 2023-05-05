import { DataSource, DataSourceOptions } from 'typeorm';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  entities:
    process.env.NODE_ENV === 'development'
      ? ['dist/src/**/*.entity.js']
      : ['src/**/*.entity.ts'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
} as DataSourceOptions);

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(appDataSource, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['dist/src/**/*.entity.js'],
    });
    break;

  case 'production':
    Object.assign(appDataSource, {
      type: 'postgres',
      // url: process.env.DATABASE_URL,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrationsRun: true,
      entities: ['dist/src/**/*.entity.js'],
      ssl: {
        rejectUnauthorized: false,
      },
    });
    break;
  default:
    throw new Error('unknown environment');
}

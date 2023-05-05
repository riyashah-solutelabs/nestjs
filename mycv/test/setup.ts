import { rm } from 'fs/promises';
import { join } from 'path';

// global.beforeEach(async () => {
//   try {
//     await rm(join(__dirname, '..', 'test.sqlite'));
//   } catch (err) {
//     //file test.sqlite exist na hoy to
//   }
// });

// import { rm } from 'fs/promises';
// import { join } from 'path';
// import { getConnection } from 'typeorm';

// global.beforeEach(async () => {
// try {
//   // await
//   await rm(join(__dirname, '..', 'test.sqlite'));
// } catch (err) {
//   //file test.sqlite exist na hoy to
// }
// });

import { User } from '../src/users/user.entity';
import { Report } from '../src/reports/report.entity';
import { getConnection, getConnectionManager } from 'typeorm';

global.beforeAll(async () => {
  const connectionManager = getConnectionManager();
  const connection = connectionManager.create({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'riyaa@2967',
    database: 'testing',
    entities: [User, Report],
    logging: false,
    synchronize: true,
  });
  await connection.connect();
});
// afterAll(async () => {
//   await getConnection().close();
// })
global.afterAll(async () => {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE`);
    // await repository.query(`TRUNCATE "report";`);
    // await repository.query(`TRUNCATE "${entity.tableName}";`);
    // await repository.query(`truncate "user";`);
  }
});

// global.beforeEach(async () => {
//   // truncate all tables before each test
//   const connection = getConnection();
//   const entities = connection.entityMetadatas;

//   for (const entity of entities) {
//     const repository = connection.getRepository(entity.name);
//     await repository.query(`TRUNCATE TABLE "${entity.tableName}" CASCADE`);
//   }
// });

// global.afterEach(async () => {
//   // clean up any remaining data after each test
//   const connection = getConnection();
//   const entities = connection.entityMetadatas;

//   for (const entity of entities) {
//     const repository = connection.getRepository(entity.name);
//     await repository.query(`DELETE FROM "${entity.tableName}" CASCADE`);
//   }
// });


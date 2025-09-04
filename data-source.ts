import 'reflect-metadata';
import { DataSource } from 'typeorm';

console.log('------------------START DB MIGRATIONS-----------------------');

const dbUrl = 'postgres://postgres:postgres@localhost:5432/test';

const AppDataSource = new DataSource({
  type: 'postgres',
  url: dbUrl,
  synchronize: false,
  logging: true,
  connectTimeoutMS: 120000,
  migrationsTransactionMode: 'all',
  migrationsTableName: 'migrations',
  migrations: [`${__dirname}/src/migrations/*.ts`],
  entities: [`${__dirname}/src/domain/entities/**.entity.ts`],
});

export default AppDataSource;

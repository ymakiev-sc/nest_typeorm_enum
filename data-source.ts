/* eslint-disable no-console */
import 'libs/common/setup/dayjs.setup';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import process from 'process';

console.log('------------------START DB MIGRATIONS-----------------------');
config({ path: `.env.${process.env.NODE_ENV}` });
console.log(`Using enviroment from file .env.${process.env.NODE_ENV}`);
const configService = new ConfigService({});
const dbUrl = configService.get<string>('DB_URL');

if (!dbUrl) {
    throw new Error('\x1b[41m DB_URL is not set\x1b[0m');
}

const AppDataSource = new DataSource({
    type: 'postgres',
    url: dbUrl,
    synchronize: false,
    logging: true,
    connectTimeoutMS: 120000,
    migrationsTransactionMode: 'all',
    migrationsTableName: 'migrations',
    migrations: [`${__dirname}/libs/migrations/*.ts`],
    entities: [
        `${__dirname}/libs/providers/database-provider/entities/**.entity{.ts,.js}`,
    ],
});

export default AppDataSource;

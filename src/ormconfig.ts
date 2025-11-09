import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Application } from './modules/applications/entities/application.entity';
import { ApplicationFile } from './modules/applications/entities/application-file.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: Number(process.env.POSTGRES_PORT || 5432),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'credilinq',
  synchronize: true,
  logging: false,
  entities: [Application, ApplicationFile],
};

export default config;

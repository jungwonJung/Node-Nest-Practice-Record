import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';

import { Board } from 'src/boards/entities/board.entity';
import { LikeRecord } from 'src/like/entities/like.entity';
import { User } from 'src/users/entities/user.entity';

dotenv.config();
const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Board, LikeRecord],
  migrations: [__dirname + '/src/migrations/*.ts'],
  cli: { migrationsDir: 'src/migrations' },
  charset: 'utf8mb4',
  synchronize: false,
  logging: true,
};

export = config;

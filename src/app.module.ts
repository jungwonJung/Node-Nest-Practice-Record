import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from 'ormcofing';
import { AuthModule } from './auth/auth.module';
import { LikeRecordModule } from './like/like.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    UsersModule,
    BoardsModule,
    AuthModule,
    LikeRecordModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

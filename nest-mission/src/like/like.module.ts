import { Module } from '@nestjs/common';
import { LikeRecordService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeRecord } from './entities/like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LikeRecord])],
  providers: [LikeRecordService],
  exports: [LikeRecordService],
})
export class LikeRecordModule {}

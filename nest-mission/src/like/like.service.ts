import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeRecord } from './entities/like.entity';

@Injectable()
export class LikeRecordService {
  constructor(
    @InjectRepository(LikeRecord)
    private likeRecordRepositoy: Repository<LikeRecord>,
  ) {}

  /**
   * 게시글 좋아요 내역 생성
   */
  async createLikeRecord(id: string, user: string) {
    return await this.likeRecordRepositoy
      .create({
        board: { id },
        user: { id: user },
      })
      .save();
  }

  /**
   * 게시글 좋아요 내역 조회
   */
  async getLikeRecord(id: string, user: string) {
    return await this.likeRecordRepositoy.findOne({
      board: { id },
      user: { id: user },
    });
  }
}

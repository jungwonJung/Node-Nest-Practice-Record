import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create.board.dto';
import { Pagination, PaginationOptions } from 'src/utils/paginate';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  /**
   * 게시글 작성
   */
  async post(data: CreateBoardDto, id: string) {
    const { title, content } = data;

    if (!data) {
      throw new HttpException('제목과 내용을 입력해주세요', 400);
    }

    if (title.length > 30) {
      throw new HttpException('제목은 30자 이내로 입력해주세요', 403);
    }

    const result = await this.boardRepository
      .create({
        title,
        content,
        userId: id,
        user: { id },
      })
      .save();

    return await this.listDetail(result.id);
  }

  // 쿼리빌더 안썻을때 전체조회
  // 쿼리빌더를 안쓰고서는 user.nickname select 해오는것이 아직 typeorm 에서는
  // 지원이 안된다는 말을 보고 쿼리빌더로 짯습니다
  //   async list(options: PaginationOptions): Promise<Pagination<Board>> {
  //     const { take, page } = options;
  //     const [results, total] = await this.boardRepository.findAndCount({
  //       relations: ['user'],
  //       select: ['id', 'userId', 'title', 'content', 'like', 'createdAt'],
  //       where: { deletedAt: null },
  //       take,
  //       skip: take * (page - 1),
  //       order: { createdAt: 'DESC' },
  //     });
  //     return new Pagination<Board>({
  //       results,
  //       total,
  //     });
  //   }

  /**
   * 전체조회
   */
  async list(options: PaginationOptions) {
    const { take, page } = options;
    return await this.boardRepository
      .createQueryBuilder('board')
      .select([
        'board.id',
        'board.like',
        'board.title',
        'board.userId',
        'user.nickname',
        'board.content',
        'board.createdAt',
      ])
      .take(take)
      .skip(take * (page - 1))
      .innerJoin('board.user', 'user')
      .where('board.deletedAt IS NULL')
      .orderBy('board.createdAt', 'DESC')
      .getManyAndCount();
  }

  /**
   * 특정 게시글 조회
   */
  async listDetail(id: string) {
    const result = await this.boardRepository.findOne({
      relations: ['user'],
      where: { id, deletedAt: null },
    });

    if (!result) {
      throw new HttpException('존재하지않는 게시글 입니다', 404);
    }

    return {
      id,
      like: result.like,
      title: result.title,
      userId: result.userId,
      content: result.content,
      createdAt: result.createdAt,
      user: { nickname: result.user.nickname },
    };
  }

  /**
   * 특정 게시글 삭제
   */
  async delete(id: string, user: string) {
    const checkBoard = await this.listDetail(id);

    if (checkBoard.userId !== user) {
      throw new HttpException('해당 게시글의 작성자가 아닙니다', 401);
    }

    if (!checkBoard) {
      throw new HttpException('존재하지않는 게시글 입니다', 404);
    }

    await this.boardRepository.softDelete({ id });

    return {
      data: 'OK',
    };
  }
}

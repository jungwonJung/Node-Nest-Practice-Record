import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptions } from 'src/utils/paginate';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create.board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  /**
   * 게시글 작성
   */
  async post(data: CreateBoardDto, uuid: string) {
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
        userId: uuid,
        user: { uuid },
      })
      .save();
  }

  // 쿼리빌더 안썻을때 전체조회
  // 쿼리빌더를 안쓰고서는 user.nickname select 해오는것이 아직 typeorm 에서는
  // 지원이 안된다는 말을 보고 쿼리빌더로 짯습니다
  //   async list(options: PaginationOptions): Promise<Pagination<Board>> {
  //     const { take, page } = options;
  //     const [results, total] = await this.boardRepository.findAndCount({
  //       relations: ['user'],
  //       select: ['uuid', 'userId', 'title', 'content', 'like', 'createdAt'],
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
      .innerJoin('board.user', 'user')
      .select([
        'board.uuid',
        'board.userId',
        'user.nickname',
        'board.title',
        'board.content',
        'board.like',
        'board.createdAt',
      ])
      .where('board.deletedAt IS NULL')
      .orderBy('board.createdAt', 'DESC')
      .skip(take * (page - 1))
      .take(take)
      .getManyAndCount();
  }
}

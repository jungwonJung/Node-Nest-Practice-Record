import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { AuthRequest } from 'src/utils/models/AuthRequest';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create.board.dto';
import { Board } from './entities/board.entity';

@Controller('boards')
@ApiTags('Board')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  @ApiOperation({
    summary: '게시물 작성 API',
    description: '게시물을 작성한다, 인증된 토큰이여야만 한다',
  })
  @ApiBody({ type: CreateBoardDto })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  async post(@Body() body: CreateBoardDto, @Request() req: AuthRequest) {
    return await this.boardsService.post(body, req.user);
  }

  /**
   *
   */
  @Get()
  @ApiOperation({
    summary: '게시물 전체 조회 API',
    description: '작성된 전체 게시글을 가져온다',
  })
  async list(@Query('take') take: number, @Query('page') page: number) {
    return await this.boardsService.list({ take, page });
  }
}

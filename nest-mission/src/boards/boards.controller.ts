import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.auth.guard';
import { AuthRequest } from 'src/utils/models/AuthRequest';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create.board.dto';

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

  /**
   *
   */
  @Get('/:id')
  @ApiOperation({
    summary: '특정 게시물 조회 API',
    description: '특정 게시글을 가져온다',
  })
  @ApiParam({ name: 'id', type: 'string' })
  async listDetail(@Param('id') id: string) {
    return await this.boardsService.listDetail(id);
  }

  /**
   *
   */
  @Get('/:id/login')
  @ApiOperation({
    summary: '특정 게시물 조회 API',
    description: '특정 게시글을 가져온다',
  })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: 'string' })
  async listDetailLogin(@Param('id') id: string, @Request() req: AuthRequest) {
    return await this.boardsService.listDetailLogin(id, req.user);
  }

  /**
   *
   */
  @Delete('/:id')
  @ApiOperation({
    summary: '특정 게시물 삭제 API',
    description: '특정 게시글을 삭제한다',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string, @Request() req: AuthRequest) {
    return await this.boardsService.delete(id, req.user);
  }

  /**
   *
   */
  @Post('/:id/like')
  @ApiOperation({
    summary: '특정 게시물 좋아요 API',
    description: '특정 게시글에 좋아요를 누른다',
  })
  @ApiParam({ name: 'id', type: 'string' })
  @ApiBearerAuth('accessToken')
  @UseGuards(JwtAuthGuard)
  async like(@Param('id') id: string, @Request() req: AuthRequest) {
    return await this.boardsService.like(id, req.user);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JoinUserDto } from './dto/join.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /** */
  @Post('join')
  @ApiOperation({
    summary: '회원가입 API',
    description: '회원가입을 한다, 이메일이 중복시에는 불가하다',
  })
  @ApiBody({ type: JoinUserDto })
  async join(@Body() body: JoinUserDto) {
    return await this.usersService.join(body);
  }

  /** */
  @Post('login')
  @ApiOperation({
    summary: '로그인 API',
    description:
      '로그인 한다, 이메일, 비밀번호가 일치하지않을때는 불가하다, 성공시 토큰 발급',
  })
  @ApiBody({ type: LoginUserDto })
  async login(@Body() body: LoginUserDto) {
    return await this.usersService.login(body);
  }
}

import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { alnum } from 'src/utils/constant';
import { JoinUserDto } from './dto/join.user.dto';
import { LoginUserDto } from './dto/login.user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * 이메일중복 체크
   */
  async checkEmail(email: string) {
    return await this.userRepository.findOne({
      email,
      deletedAt: null,
    });
  }

  /**
   * 토큰으로 사용자 확인(authService 에서 검증)
   */
  async find(uuid: string) {
    const result = await this.userRepository.findOne({
      relations: ['board'],
      where: { uuid },
      select: ['uuid', 'email', 'nickname'],
    });
    if (!result) {
      throw new HttpException('권한이 없습니다', 401);
    }
    return {
      userId: result.uuid,
    };
  }

  /**
   * 회원가입
   */
  async join(data: JoinUserDto) {
    const { email, password, nickname } = data;

    const checkEmail = await this.checkEmail(email);

    if (checkEmail) {
      throw new HttpException('이미 존재하는 이메일 입니다', 403);
    }
    if (!data) {
      throw new HttpException('모든 정보를 입력해주세요', 400);
    }
    if (nickname.length > 10) {
      throw new HttpException('10자가 넘어가면 안됩니다', 403);
    }
    if (!password.match(alnum)) {
      throw new HttpException('알파벳과 숫자로 구성되어야합니다', 403);
    }
    const hashPassword = await bcrypt.hash(password, 12);
    await this.userRepository
      .create({
        email,
        nickname,
        password: hashPassword,
      })
      .save();

    return { data: 'OK' };
  }

  /**
   * 로그인
   */
  async login(data: LoginUserDto) {
    const { email, password } = data;

    const checkEmail = await this.checkEmail(email);

    if (!checkEmail) {
      throw new HttpException('존재하지 않는 이메일 입니다', 403);
    }

    const result = await bcrypt.compare(password, checkEmail.password);

    if (!result) {
      throw new HttpException('비밀번호가 일치하지 않습니다', 403);
    }

    const payload = { id: checkEmail.uuid };

    return {
      token: this.jwtService.sign(payload),
      user: {
        uuid: checkEmail.uuid,
        email: checkEmail.email,
        nickname: checkEmail.nickname,
      },
    };
  }
}

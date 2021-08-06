import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * 토큰으로 사용자 확인(authService 에서 검증)
   */
  async find(uuid: string) {
    await this.userRepository.findOne({
      relations: ['board'],
      where: { uuid },
      select: ['uuid', 'email', 'nickname'],
    });
  }
}

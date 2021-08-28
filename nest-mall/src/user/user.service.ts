import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../src/entities/user.entity';
// src/user/user.entoty 모듈을 못찾는다해서 절대경로로 바꿧더니 찾음..
import * as bcrypt from 'bcrypt';
import { CreateUsersDto } from 'src/dtos/createuser.dto';
import { UsersRepository } from '../../src/user/user.repository';
import { Connection } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    async create(data: CreateUsersDto) {
        const isExist = await this.usersRepository.findOne({
            userEmail: data.userEmail,
        });
        if (isExist) {
            throw new ForbiddenException({
                statusCode: HttpStatus.CONFLICT,
                message: ['등록된 이메일입니다'],
                error: '금지',
            });
        }
        try {
            const hashPassword = await bcrypt.hash(data.userPassword, 12);
            await this.usersRepository.save({
                userEmail: data.userEmail,
                userName: data.userName,
                userPassword: hashPassword,
            });
        } catch (error) {
            return {
                ...error,
            };
        }
        return {
            message: '가입완료, 적립금 10000원이 발급되었습니다',
            userEmail: data.userEmail,
            userName: data.userName,
            userPoint: data.userPoint,
            userPassword: data.userPassword,
        };
    }

    async login(userEmail: string, userPassword: string) {
        const user = await this.usersRepository.findOne({ userEmail });
        if (!user) {
            throw new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                error: '이메일을 찾지못함',
                message: ['사용자의 이메일이 없습니다'],
            });
        }
        if (!(await bcrypt.compare(userPassword, user.userPassword))) {
            throw new NotFoundException({
                statusCode: HttpStatus.CONFLICT,
                error: '비밀번호가 일치하지않음',
                message: '비밀번호가 일치하지 않습니다',
            });
        }

        const payload = { userId: user.userId };
        const accessToken = await this.jwtService.sign(payload);
        return {
            userEmail: user.userEmail,
            userName: user.userName,
            userToken: accessToken,
        };
    }

    async findEmail(userId: number) {
        const user = await this.usersRepository.findOne({
            where: { userId: userId },
        });
        return user;
    }
}

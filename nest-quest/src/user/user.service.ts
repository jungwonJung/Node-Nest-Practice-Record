import { ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
// src/user/user.entoty 모듈을 못찾는다해서 절대경로로 바꿧더니 찾음..
import * as bcrypt from 'bcrypt';
import { CreateUsersDto } from 'src/dtos/createuser.dto';
import { Connection } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { UsersRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
    ) {}

    /**
     *
     * @param data
     * @returns 이메일중복안될시 성공
     * 회원가입
     */
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
                userPhone: data.userPhone,
            });
        } catch (error) {
            return {
                ...error,
            };
        }
        return {
            message: '가입완료',
            userEmail: data.userEmail,
            userName: data.userName,
            userPassword: data.userPassword,
            userPhone: data.userPhone,
        };
    }

    /**
     *
     * @param userEmail
     * @param userPassword
     * @returns 비밀번호 복호화
     * 회원 로그인
     */
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

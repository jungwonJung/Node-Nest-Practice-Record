import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { CreateUsersDto } from './createuser.dto';
import { SignInRequestDto, SignInResponseDto } from './signIn.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}

    // save를통해 데이터 저장하는 과정에 중복된 이메일이 있으면 error 보내주기
    async create(data: CreateUsersDto) {
        const isExist = await this.usersRepository.findOne({
            userEmail: data.userEmail,
        });
        if (isExist) {
            throw new ForbiddenException({
                statusCode:HttpStatus.FORBIDDEN,
                message:['등록된 이메일입니다'],
                error:'금지'
            });
        }
        try {
            await this.usersRepository.save(data)
        } catch (error) {
            return {
                ...error
            };
        }
        return {
            statusCode: HttpStatus.CREATED,
            message:'가입완료'

            
        }
    }

    async signIn(data: SignInRequestDto): Promise<SignInResponseDto> {
        try {
            const user = await this.usersRepository.findOne({ userEmail: data.userEmail});
            if (!user) {
            throw new NotFoundException({
                error: '찾지못함',
                message: ['사용자를 찾지 못했습니다.'],
            });
            }
            const passwordCorrect = await this.usersRepository.findOne({userPassword:data.userPassword});
            if (!passwordCorrect) {
                throw new BadRequestException({
                error: '요청이 잘못됬습니다',
                message: ['비밀번호가 틀렸습니다.'],
            });
            } 
            // const token = this.jwtService.sign(user.user_id);
            return {
                userEmail:data.userEmail,
                userName:user.userName
            }
        } catch (error) {
            return {
            statusCode: error.status,
            ...error.response,
            };
        }
        }
    }


import { BadRequestException, ForbiddenException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private jwtService : JwtService
            ){}

    async create(data: any) {
        const isExist = await this.usersRepository.findOne({  
            userEmail: data.userEmail
        });
        if (isExist) {
            throw new ForbiddenException({
                statusCode:HttpStatus.CONFLICT,
                message:['등록된 이메일입니다'],
                error:'금지'
            });
        }
        try {
            const hashPassword = await bcrypt.hash(data.userPassword, 12);
            await this.usersRepository.save({
                userEmail : data.userEmail,
                userName  : data.userName,
                userPassword : data.userPassword
                }) 
        } catch (error) {
            return {
                ...error
            };
        }
        return {
            message:'가입완료, 적립금 10000원이 발급되었습니다',
            userEmail : data.userEmail,
            userName : data.userName,
            userPoint : data.userPoint,
            userPassword : data.userPassword
        }
    }



    async signIn(userEmail : string, userPassword : string){
            const user = await this.usersRepository.findOne({userEmail});
            if (!user) { 
            throw new NotFoundException({
                error: '찾지못함',
                message: ['사용자를 찾지 못했습니다.'],
            });
            }
            if (!await bcrypt.compare(userPassword, user.userPassword)) {
                throw new NotFoundException({
                    error : '비밀번호가 일치하지않음',
                    message : '비밀번호가 일치하지 않습니다'
                })
            }
            const jwt = await this.jwtService.signAsync({userEmail : user.userEmail})

            return {
                userEmail : user.userEmail,
                userName : user.userName,
                userToken : jwt
            }
        
    }

}

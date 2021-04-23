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

    // save를통해 데이터 저장하는 과정에 중복된 이메일이 있으면 error 보내주기
    // 회원가입
    async create(data: any) {
        const isExist = await this.usersRepository.findOne({  // 입력받은 이메일 값과 저장되어 있는 데이터 비교
            userEmail: data.userEmail
        });
        if (isExist) {
            throw new ForbiddenException({ // 중복되는값이 있으면 에러 날리기
                statusCode:HttpStatus.FORBIDDEN,
                message:['등록된 이메일입니다'],
                error:'금지'
            });
        }
        try {
            await this.usersRepository.save(data) // userRepository 는 Product 를 나타냄
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



    // 로그인 api
    async signIn(userEmail : string, userPassword : string){
            const user = await this.usersRepository.findOne({userEmail});
            if (!user) { // 입력받은 데이터와 저장되어있는 데이터 비교
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
                Token : jwt
            }
        
    }

}

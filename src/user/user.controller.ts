import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { SignInRequestDto } from './signIn.dto';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt'
import { CreateUsersDto } from './createuser.dto';


// Module에 등록하면 현재의(User)에서 UsersRepository를 @InjectRepository() decorator를 사용하여 UserService안에 inject 
@Controller('user')
export class UserController {
    constructor (
        private readonly userService: UserService,
        ) {}
    

    @Post('/create')
    @ApiBody({type : CreateUsersDto})
    @HttpCode(HttpStatus.CREATED)
    async create(
        @Body('userEmail') userEmail : string,
        @Body('userName') userName : string,
        @Body('userPassword') userPassword : string,
    ) {
        const hashPassword = await bcrypt.hash(userPassword, 12);
        return this.userService.create({
            userEmail,
            userName,
            userPassword : hashPassword
        })
    }


    @ApiBody({type : SignInRequestDto})
    @Post('/sign-in')
    async signIn(
        @Body('userEmail') userEmail : string, 
        @Body('userPassword') userPassword : string,
    ) {

        return this.userService.signIn(userEmail, userPassword)
    }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { CreateUsersDto } from './createuser.dto';
import { SignInRequestDto, SignInResponseDto } from './signIn.dto';
import { UserService } from './user.service';

// Module에 등록하면 현재의(User)에서 UsersRepository를 @InjectRepository() decorator를 사용하여 UserService안에 inject 
@Controller('user')
export class UserController {
    constructor (private readonly userService: UserService) {}

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateUsersDto) {
        return this.userService.create(data)
    }

    @Post('/sign-in')
    signIn(@Body() data:SignInRequestDto): Promise<SignInResponseDto> {
        return this.userService.signIn(data)
    }
}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { SignInRequestDto } from './signIn.dto';
import { UserService } from './user.service';
import { CreateUsersDto } from './createuser.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/create')
    @ApiBody({ type: CreateUsersDto })
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() data: CreateUsersDto): Promise<CreateUsersDto> {
        return this.userService.create(data);
    }

    @ApiBody({ type: SignInRequestDto })
    @Post('/sign-in')
    async signIn(@Body('userEmail') userEmail: string, @Body('userPassword') userPassword: string) {
        return this.userService.signIn(userEmail, userPassword);
    }
}

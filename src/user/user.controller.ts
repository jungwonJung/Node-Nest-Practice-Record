import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignInRequestDto } from '../dtos/signIn.dto';
import { CreateUsersDto } from 'src/dtos/createuser.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    /**
     *
     * @param data
     * @returns 회원생성
     */
    @Post('/create')
    @ApiBody({ type: CreateUsersDto })
    async create(@Body() data: CreateUsersDto): Promise<CreateUsersDto> {
        return this.userService.create(data);
    }

    /**
     *
     * @param userEmail
     * @param userPassword
     * @returns 유저로그인
     */
    @ApiBody({ type: SignInRequestDto })
    @Post('/login')
    async signIn(@Body('userEmail') userEmail: string, @Body('userPassword') userPassword: string) {
        return this.userService.login(userEmail, userPassword);
    }
}

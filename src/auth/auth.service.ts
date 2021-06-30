import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

/**
 * 인증 비즈니스로직
 */
@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(userId: number) {
        const user = await this.userService.findEmail(userId);
        const result = {
            userId: user.userId,
            userEmail: user.userEmail,
            userName: user.userName,
        };
        return result;
    }
}

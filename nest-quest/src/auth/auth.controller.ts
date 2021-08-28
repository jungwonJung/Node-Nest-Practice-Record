import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';

/**
 * 인증컨트롤러
 */
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('accessToken')
    @Get('/validate')
    async validate(@Request() req) {
        return await this.authService.validateUser(req.user.userId);
    }
}

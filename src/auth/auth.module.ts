import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
            // configmodule 사용 .env 설정값들 가져오기
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                // useFactory jwtmoduleasync 옵션
                secret: process.env.JWT_SECRET,
                // secretOrPrivateKey 을 사용하면 비추천한다고 문구가나와서 secret 으로 대체
                signOptions: { expiresIn: '100000s' },
            }),
            inject: [ConfigService],
        }),
        ConfigModule.forRoot({
            // configmodule .env 파일 설정
            envFilePath: './.env',
        }),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule {}

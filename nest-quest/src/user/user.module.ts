import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        PassportModule,
        JwtModule.registerAsync({
            // configmodule 사용 .env 설정값들 가져오기
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                // useFactory jwtmoduleasync 옵션
                secret: configService.get<string>('JWT_SECRET'),
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
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}

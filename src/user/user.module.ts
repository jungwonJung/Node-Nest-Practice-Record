import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.register({
    secret : 'qlalfdlqslekd',
    signOptions : {expiresIn : '10000s'}
  })
], // User 엔티티를 사용하기위한 Repository 등록, TypeOrmModule의 forFeature() 메서드를 사용하여 현재 scope(User)에서 어떤 repository를 등록할 것 인지 결정
  controllers: [UserController],
  providers: [UserService], // UserRepository를 생성자 파라미터값으로 받아오자
  exports : [UserService]
})
export class UserModule {}

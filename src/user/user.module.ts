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
], 
  controllers: [UserController],
  providers: [UserService], 
  exports : [UserService]
})
export class UserModule {}

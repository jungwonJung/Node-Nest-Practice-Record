import { ApiProperty } from '@nestjs/swagger';

import { IsAlphanumeric, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '회원 이메일', required: true })
  @IsEmail({}, { message: '이메일 형식이 아닙니다' })
  email: string;

  @ApiProperty({ description: '회원 비밀번호', required: true })
  @IsAlphanumeric()
  password: string;
}

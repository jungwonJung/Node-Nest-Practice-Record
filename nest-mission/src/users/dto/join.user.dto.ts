import { ApiProperty } from '@nestjs/swagger';

import { IsAlphanumeric, IsEmail, IsString, MinLength } from 'class-validator';

export class JoinUserDto {
  @ApiProperty({ description: '회원 이메일', required: true })
  @IsEmail({}, { message: '이메일 형식이 아닙니다' })
  email: string;

  @ApiProperty({ description: '회원 닉네임', required: true })
  @IsString()
  @MinLength(1, {
    message: '최소 2글자이상은 적어주세요',
  })
  nickname: string;

  @ApiProperty({ description: '회원 비밀번호', required: true })
  @IsAlphanumeric()
  password: string;
}

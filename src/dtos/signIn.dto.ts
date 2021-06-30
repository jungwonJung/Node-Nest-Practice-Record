import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

/**
 * 로그인시 사용하는 dto
 */
export class SignInRequestDto {
    @ApiProperty()
    @IsEmail()
    userEmail: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(8, 20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: '대문자,소문자, 특수문자를 섞어주세요 최소 8글자 최대 20자',
    })
    userPassword: string;
}

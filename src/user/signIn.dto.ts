import { IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInRequestDto {
    @ApiProperty()
    @IsEmail()
    userEmail: string;

    @ApiProperty()
    @Length(3, 20)
    userPassword: string;

    userName: string;
}

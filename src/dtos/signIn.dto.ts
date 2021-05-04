import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class SignInRequestDto {
    @ApiProperty()
    @IsEmail()
    userEmail: string;

    @ApiProperty()
    @Length(3, 20)
    userPassword: string;
}

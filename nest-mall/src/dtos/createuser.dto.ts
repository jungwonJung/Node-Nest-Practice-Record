import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class CreateUsersDto {
    userId: number;

    @ApiProperty()
    @IsEmail()
    userEmail: string;

    @ApiProperty()
    @IsNotEmpty()
    userName: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(3, 20)
    userPassword: string;

    @IsNotEmpty()
    userPoint: string = '10000';
}

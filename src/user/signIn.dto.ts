import { IsEmail, IsNotEmpty, IsString, IS_LENGTH, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class SignInRequestDto {
    @ApiProperty()
    @IsEmail()
	userEmail: string;

    @ApiProperty()
    @Length(3, 20)
    userPassword: string;

    userName: string;
    }

export class SignInResponseDto {
	statusCode?: number;
    token?: string;
    error?: string;
    message?: string;
    userEmail?: string;
    userName?:string;
}
import { DefaultValuePipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";


// 회원가입시 필요 dto
// DTO란 각 계층(컨트롤러, 뷰 등) 간의 데이터 교환을 위한 객체를 말한다

export class CreateUsersDto {
    user_id: string;

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
    userPoint: string = '10000'

    }
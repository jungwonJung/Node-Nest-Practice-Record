import { IsNumber, IsOptional, IsString } from "class-validator"; // 유효성검사

export class CreateMovieDto {

    @IsString() //유효성검사
    readonly title:string;

    @IsNumber()
    readonly year:number;

    @IsString({ each: true })
    @IsOptional() // class-validator
    readonly genres:string[];
}
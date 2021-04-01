import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator"; // 유효성검사
import { CreateMovieDto } from "./create-movie.dto";

// export class UpdateMovieDto {

//     @IsString() //유효성검사
//     readonly title?:string;  // ? require 해제

//     @IsNumber()
//     readonly year?:number;

//     @IsString({ each: true })
//     readonly genres?:string[];
// }


export class UpdateMovieDto extends PartialType(CreateMovieDto) {

}
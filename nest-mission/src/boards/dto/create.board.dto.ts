import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ description: '게시물 제목', required: true })
  @IsString()
  @MaxLength(30)
  title: string;

  @ApiProperty({ description: '게시물 내용', required: true })
  @IsString()
  content: string;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class FileUploadDto {
    
    @ApiProperty()
    @IsNotEmpty()
    product_image: string;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateProductDto { // 상품생성시
    product_id:string;

    @ApiProperty()
    @IsNotEmpty()
    product_title: string;

    @ApiProperty()
    @IsNotEmpty()
    product_category: string;

    @ApiProperty()
    @IsNotEmpty()
    product_image: string;

    @ApiProperty()
    @IsNotEmpty()
    product_description: string;

    @ApiProperty()
    @IsNotEmpty()
    product_price: string;
}
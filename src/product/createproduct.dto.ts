import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    productId: number;

    @ApiProperty()
    @IsNotEmpty()
    productTitle: string;

    @ApiProperty()
    @IsNotEmpty()
    productCategory: string;

    @ApiProperty()
    @IsNotEmpty()
    productDescription: string;

    @ApiProperty()
    @IsNotEmpty()
    productImage: string;

    @ApiProperty()
    @IsNotEmpty()
    productPrice: number;
}

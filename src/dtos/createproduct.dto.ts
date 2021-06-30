import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * 상품등록dto
 */
export class CreateProductDto {
    productId: number;

    @ApiProperty()
    @IsNotEmpty()
    productTitle: string;

    @ApiProperty()
    @IsNotEmpty()
    productImage: string;

    @ApiProperty()
    @IsNotEmpty()
    discountPer: string;

    @ApiProperty()
    @IsNotEmpty()
    productPrice: number;

    @ApiProperty()
    @IsNotEmpty()
    productDiscountPrice: number;

    @ApiProperty()
    @IsNotEmpty()
    productScore: number;

    @ApiProperty()
    @IsNotEmpty()
    productFreeDelivery: boolean;
}

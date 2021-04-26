import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request } from '@nestjs/common';
import { CreateProductDto } from './createproduct.dto';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get('/detail/:id')
    detail(@Param('id') id: number): Promise<Product> {
        return this.productService.detail(id);
    }

    @Get('/list')
    list(@Request() request, @Query('limit') limit: number, @Query('page') page: number) {
        return this.productService.list({
            limit,
            page,
        });
    }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateProductDto) {
        return this.productService.createproduct(data);
    }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from 'src/dtos/createproduct.dto';

@Controller('products')
@ApiTags('Product')
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

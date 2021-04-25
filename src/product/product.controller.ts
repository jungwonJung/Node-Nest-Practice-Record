import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from './createproduct.dto';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('products')
export class ProductController {
    constructor (private readonly productService : ProductService) {}
    
    @Get('/list')
    async index(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10,
        ): Promise<Pagination<Product>> {
        limit = limit > 100 ? 100 : limit;
        return this.productService.list({
        page,
        limit,
        });
    }

    @Get('/detail/:id')
    detail(@Param('id') id : string) : Promise<Product> {
        return this.productService.detail(id)
    }



    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateProductDto) {
        return this.productService.createproduct(data)
    }
    


}

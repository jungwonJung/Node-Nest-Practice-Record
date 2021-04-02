import { Body, Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductDto } from './createproduct.dto';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { PaginationDto } from './pagination.dto';
import { PaginatedProductsResultDto } from './paginateproductresult.dto';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('products')
export class ProductController {
    constructor (private readonly productService : ProductService) {}

    @Get('/list')
        async index(
        @Query('page', new ParseIntPipe) page: number = 1,
        @Query('limit', new ParseIntPipe) limit: number = 10,
        ): Promise<Pagination<Product>> {
        limit = limit > 100 ? 100 : limit;
        return this.productService.paginate({
            page,
            limit,
        });
        }

    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateProductDto) {
        return this.productService.createproduct(data)
    }

    @Post('/upload')
    @UseInterceptors(FilesInterceptor('image'))
    uploadFile(@UploadedFile() file){
        console.log(file);
    }


}

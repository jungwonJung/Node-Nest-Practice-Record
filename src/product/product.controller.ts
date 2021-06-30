import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from 'src/dtos/createproduct.dto';

@Controller('products')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    /**
     *
     * @param id
     * @returns product.detail
     * 상품 id 값으로 조회 디테일 조회
     */
    @Get('/detail/:id')
    detail(@Param('id') id: number): Promise<Product> {
        return this.productService.detail(id);
    }

    /**
     *
     * @param request
     * @param limit
     * @param page
     * @param sort
     * @returns 상품가격별 sort list
     */
    @Get('/list')
    list(
        @Request() request,
        @Query('limit') limit: number,
        @Query('page') page: number,
        @Query('sort') sort: string,
    ) {
        return this.productService.list({
            limit,
            page,
            sort,
        });
    }

    /**
     *
     * @param request
     * @param limit
     * @param page
     * @param sort
     * @returns 상품 평점별 sort
     */
    @Get('/list/score')
    listScore(
        @Request() request,
        @Query('limit') limit: number,
        @Query('page') page: number,
        @Query('sort') sort: string,
    ) {
        return this.productService.list({
            limit,
            page,
            sort,
        });
    }

    /**
     *
     * @param request
     * @param limit
     * @param page
     * @param sort
     * @returns 상품 시간순 sort
     */
    @Get('/list/new')
    listNew(
        @Request() request,
        @Query('limit') limit: number,
        @Query('page') page: number,
        @Query('sort') sort: string,
    ) {
        return this.productService.list({
            limit,
            page,
            sort,
        });
    }

    /**
     *
     * @param data
     * @returns 상품정보 입력
     */
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateProductDto) {
        return this.productService.createproduct(data);
    }

    /**
     *
     * @param id
     * @returns softdelete 와 비슷한 delete
     */
    @Patch('/delete/:id')
    delete(@Param('id') id: number) {
        return this.productService.delete(id);
    }
}

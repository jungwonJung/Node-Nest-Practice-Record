import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateProductDto } from './createproduct.dto';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { UploadFileDto } from './upload.file.dto';
import { ApiBody, ApiConsumes} from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';

@Controller('products')
export class ProductController {
    constructor (private readonly productService : ProductService) {}
    
    // 전체조회 페이지네이션
    @Get('/list')
    async index(
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 10,
        // @Param('sort') sort : number 
        ): Promise<Pagination<Product>> {
        limit = limit > 100 ? 100 : limit;
        return this.productService.list({
        page,
        limit,
        });
    }

    // 해당 싱품 id url 접속시 제품 상세정보
    @Get('/detail/:id')
    detail(@Param('id') id : string) : Promise<Product> {
        return this.productService.detail(id)
    }



    // 상품생성
    @Post('/create')
    @HttpCode(HttpStatus.CREATED)
    create(@Body() data: CreateProductDto) {
        return this.productService.createproduct(data)
    }
    

    // 이미지업로드 관련 현재 주석
    // @Post('/upload')
    // @ApiConsumes('multipart/form-data')
    // @UseInterceptors(FileInterceptor('file', {
    //     storage : diskStorage({
    //         destination : '../upload',
    //         filename : editFileName,
    //     }),
    //     fileFilter : imageFileFilter
    // }))
    // async uploadFile(
    //     @Body() uploadFileDto : UploadFileDto,
    //     @UploadedFile() file) {
    //     const responseFilename = {
    //         originalname : file.originalname,
    //         filename : file.filename
    //     };
    //     return console.log(responseFilename.filename)
    // }

}

import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { privateEncrypt } from 'node:crypto';
import { Repository } from 'typeorm';
import { CreateProductDto } from './createproduct.dto';
import { Product } from './entities/product.entity';
import { PaginatedProductsResultDto } from './paginateproductresult.dto';
import { PaginationDto } from './pagination.dto';


@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepsitory : Repository<Product>
    ) {}

    async createproduct(data: CreateProductDto) {
        const isExist = await this.productRepsitory.findOne({
            product_title: data.product_title
        });
        if (isExist) {
            throw new ForbiddenException({
                statusCode:HttpStatus.FORBIDDEN,
                message:['상품명이 중복됩니다'],
                error:'상품명중복'
            });
        } 
        try {
            await this.productRepsitory.save(data)
        } catch (error) {
            return {
                ...error
            }
        }
        return {
            statusCode: HttpStatus.CREATED,
            message:'상품등록완료'
        }
    } 


    async paginate(options: IPaginationOptions): Promise<Pagination<Product>> {
        const queryBuilder = this.productRepsitory.createQueryBuilder();
        queryBuilder.orderBy('product_price', "DESC"); 
    
        return paginate<Product>(queryBuilder, options);
        }
}

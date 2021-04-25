import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate,Pagination, IPaginationOptions,} from 'nestjs-typeorm-paginate';
import { extname } from 'path';
import { Any, Repository } from 'typeorm';
import { CreateProductDto } from './createproduct.dto';
import { Product } from './entities/product.entity';




@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepsitory : Repository<Product>
    ) {}


    
    async createproduct(data: CreateProductDto) {
        const isExist = await this.productRepsitory.findOne({  
            productTitle: data.productTitle
        });
        if (isExist) { 
            throw new ForbiddenException({
                statusCode:HttpStatus.CONFLICT,
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

    async list(options : IPaginationOptions ) : Promise<Pagination<Product>> {
        const queryBuilder = this.productRepsitory
            .createQueryBuilder('product')
            .select(['product.productTitle', 'product.productImage', 'product.productPrice'])
        return paginate<Product>(queryBuilder, options);
    }


    async detail(id : string) : Promise<Product> {
        return this.productRepsitory.findOne({productId : id})
    }

}



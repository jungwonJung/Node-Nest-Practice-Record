import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination } from 'src/paginate/pagination';
import { PaginationOptions } from 'src/paginate/pagination.options';
import { Repository } from 'typeorm';
import { CreateProductDto } from './createproduct.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepsitory: Repository<Product>,
    ) {}

    async createproduct(data: CreateProductDto) {
        const isExist = await this.productRepsitory.findOne({
            productTitle: data.productTitle,
        });
        if (isExist) {
            throw new ForbiddenException({
                statusCode: HttpStatus.CONFLICT,
                message: ['상품명이 중복됩니다'],
                error: '상품명중복',
            });
        }
        try {
            await this.productRepsitory.save(data);
        } catch (error) {
            return {
                ...error,
            };
        }
        return {
            statusCode: HttpStatus.CREATED,
            message: '상품등록완료',
        };
    }

    async list(options: PaginationOptions): Promise<Pagination<Product>> {
        const [results, total] = await this.productRepsitory.findAndCount({
            select: ['productTitle', 'productPrice', 'productImage'],
            take: options.limit,
            skip: options.page,
        });
        return new Pagination<Product>({
            results,
            total,
        });
    }
    async detail(id: number): Promise<Product> {
        return this.productRepsitory.findOne({ productId: id });
    }
}

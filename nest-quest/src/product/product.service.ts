import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { truncate } from 'fs';
import { Pagination } from 'src/paginate/pagination';
import { PaginationOptions } from 'src/paginate/pagination.options';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/createproduct.dto';
import { Product } from '../entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepsitory: ProductRepository,
    ) {}

    /**
     * 상품 생성 로직
     * 중복시 등록안됨
     */
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

    /**
     *
     * @param options
     * @returns 상품가격별 조회
     */
    async list(options: PaginationOptions): Promise<Pagination<Product>> {
        if (options.sort === 'ASC') {
            const [results, total] = await this.productRepsitory.findAndCount({
                select: [
                    'productTitle',
                    'productPrice',
                    'productImage',
                    'discountPer',
                    'productDiscountPrice',
                    'productFreeDelivery',
                    'productScore',
                ],
                where: { isDeleted: false },
                take: options.limit,
                skip: options.page,
                order: { productPrice: 'ASC' },
            });
            return new Pagination<Product>({
                results,
                total,
            });
        }

        if (options.sort === 'DESC') {
            const [results, total] = await this.productRepsitory.findAndCount({
                select: [
                    'productTitle',
                    'productPrice',
                    'productImage',
                    'discountPer',
                    'productDiscountPrice',
                    'productFreeDelivery',
                    'productScore',
                ],
                where: { isDeleted: false },
                take: options.limit,
                skip: options.page,
                order: { productPrice: 'DESC' },
            });
            return new Pagination<Product>({
                results,
                total,
            });
        }
    }

    /**
     *
     * @param options
     * @returns 상품평점별 조회
     */
    async listScore(options: PaginationOptions): Promise<Pagination<Product>> {
        if (options.sort === 'ASC') {
            const [results, total] = await this.productRepsitory.findAndCount({
                select: [
                    'productTitle',
                    'productPrice',
                    'productImage',
                    'discountPer',
                    'productDiscountPrice',
                    'productFreeDelivery',
                    'productScore',
                ],
                where: { isDeleted: false },
                take: options.limit,
                skip: options.page,
                order: { productScore: 'ASC' },
            });
            return new Pagination<Product>({
                results,
                total,
            });
        }

        if (options.sort === 'DESC') {
            const [results, total] = await this.productRepsitory.findAndCount({
                select: [
                    'productTitle',
                    'productPrice',
                    'productImage',
                    'discountPer',
                    'productDiscountPrice',
                    'productFreeDelivery',
                    'productScore',
                ],
                where: { isDeleted: false },
                take: options.limit,
                skip: options.page,
                order: { productScore: 'DESC' },
            });
            return new Pagination<Product>({
                results,
                total,
            });
        }
    }

    /**
     *
     * @param options
     * @returns 상품등록일자별 조회
     */
    async listNew(options: PaginationOptions): Promise<Pagination<Product>> {
        if (options.sort === 'ASC') {
            const [results, total] = await this.productRepsitory.findAndCount({
                select: [
                    'productTitle',
                    'productPrice',
                    'productImage',
                    'discountPer',
                    'productDiscountPrice',
                    'productFreeDelivery',
                    'productScore',
                ],
                where: { isDeleted: false },
                take: options.limit,
                skip: options.page,
                order: { createdAt: 'ASC' },
            });
            return new Pagination<Product>({
                results,
                total,
            });
        }

        if (options.sort === 'DESC') {
            const [results, total] = await this.productRepsitory.findAndCount({
                select: [
                    'productTitle',
                    'productPrice',
                    'productImage',
                    'discountPer',
                    'productDiscountPrice',
                    'productFreeDelivery',
                    'productScore',
                ],
                where: { isDeleted: false },
                take: options.limit,
                skip: options.page,
                order: { createdAt: 'DESC' },
            });
            return new Pagination<Product>({
                results,
                total,
            });
        }
    }

    /**
     *
     * @param id
     * @returns id로 상품조회 디테일데이터
     */
    async detail(id: number): Promise<Product> {
        return this.productRepsitory.findOne({ productId: id });
    }

    /**
     *
     * @param id
     * @returns 상품삭제data
     */
    async delete(id: number): Promise<Product> {
        return this.productRepsitory.save({ isDeleted: true });
    }
}

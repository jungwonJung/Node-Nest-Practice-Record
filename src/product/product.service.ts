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


    
    // 상품생성 상품정보입력
    async createproduct(data: CreateProductDto) {
        const isExist = await this.productRepsitory.findOne({  // 중복되는 파일이름이 존재하는지 확인
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

    // 상품리스트반환
    async list(options : IPaginationOptions ) : Promise<Pagination<Product>> {
        const queryBuilder = this.productRepsitory
            .createQueryBuilder('product')
            .select(['product.product_title', 'product.product_image', 'product.product_price'])
        return paginate<Product>(queryBuilder, options);
    }


    // 해당 상품의 id 로 접속시 상품정보확인 
    async detail(id : string) : Promise<Product> {
        return this.productRepsitory.findOne({product_id : id})
    }

}


// 파일 업로드시 파일 확장자 체크 및 이름 변경
// export const imageFileFilter = (req : any, file : any, callback : any) =>  {
//     if (!file.originalname.match(/\.(jpg||jpeg||png||gif)$/)) {  // 파일 형식에 따른 저장 가능
//         return callback(new Error('이미지파일만 업로드 가능합니다'), false); 
//     }
//     callback (null, true)
// };

// // 파일 이름 변경 
// export const editFileName = (req : any, file : any, callback : any) => {
//     const name = file.originalname.split('.')[0];
//     const fileExtName = extname(file.originalname);
//     const randomName = Array(4)
//         .fill(null)
//         .map(() => Math.round(Math.random() * 16).toString(16))
//         .join('');
//     callback(null, `${name}-${randomName}${fileExtName}`)

// }

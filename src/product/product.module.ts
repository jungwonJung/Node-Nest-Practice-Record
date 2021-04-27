import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        MulterModule.register({
            dest: '../upload',
        }),
    ],
    providers: [ProductService],
    controllers: [ProductController],
})
export class ProductModule {}

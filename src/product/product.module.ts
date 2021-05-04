import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from 'src/entities/product.entity';

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

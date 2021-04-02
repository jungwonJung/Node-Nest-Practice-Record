import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from './jwt/jwt.module';
import { ProductModule } from './product/product.module';
import { MulterModule } from '@nestjs/platform-express';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { Product } from './product/entities/product.entity';


@Module({
  imports: [TypeOrmModule.forRoot({entities: [Product]}),UserModule,ProductModule,JwtModule.forRoot({
    'privateKey': process.env.PRIVATE_KEY
  }),MulterModule.register({
    dest: './upload',
  })], // TypeOrmModule.forRoot() typeORM 사용하기위해 추가
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {}

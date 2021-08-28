import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { Product } from './entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({ entities: [Product] }),
        UserModule,
        ProductModule,
        AuthModule,
        ConfigModule.forRoot(),
        PurchaseModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

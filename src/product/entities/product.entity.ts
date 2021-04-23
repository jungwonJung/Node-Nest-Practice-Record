import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";

@Entity({name:'product', schema:'nest-mall', orderBy : { product_price : 'DESC'}}) // 현재 기본설정에선 가격이 높은 순으로 정렬
export class Product {

    @PrimaryGeneratedColumn()
    product_id:string;

    @Column({length:64})
    product_title:string;

    @Column({length:64})
    product_category:string;

    @Column({length:64})
    product_image:string;

    @Column({length:64})
    product_description:string;

    @Column({length:64})
    product_price:string;

}


// mysql테이블 조건 entities



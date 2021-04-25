import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";

@Entity({name:'product', schema:'nest-mall', orderBy : { product_price : 'DESC'}}) 
export class Product {

    @PrimaryGeneratedColumn()
    productId:string;

    @Column({length:64})
    productTitle:string;

    @Column({length:64})
    productCategory:string;

    @Column({length:64})
    productImage:string;

    @Column({length:64})
    productDescription:string;

    @Column({length:64})
    productPrice:string;

}





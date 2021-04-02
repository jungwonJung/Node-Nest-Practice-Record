import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";

@Entity({name:'product', schema:'nest-mall'})
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


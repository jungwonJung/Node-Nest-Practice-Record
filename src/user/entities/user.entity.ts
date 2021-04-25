import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Entity({name:'user', schema:'nest-mall'})
export class User {

    @PrimaryGeneratedColumn()
    userId:string;


    @Column({length:64})
    userEmail:string;

    @Column({length:64})
    userName:string;

    @Column({length:64})
    userPassword:string;

    @Column({default : 10000})
    userPoint:number;

}
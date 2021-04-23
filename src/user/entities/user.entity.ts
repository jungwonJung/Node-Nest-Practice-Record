import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Entity({name:'user', schema:'nest-mall'})
export class User {

    @PrimaryGeneratedColumn()
    user_id:string;


    @Column({length:64})
    userEmail:string;

    @Column({length:64})
    userName:string;

    @Column({length:64})
    userPassword:string;

    @Column({length:64, default : 10000})
    userPoint:string;

            
    // async checkPassword(userPassword: string): Promise<boolean> {
    //     try {
    //         return await bcrypt.compare(userPassword, this.userPassword);
    //     } catch (error) {
    //         console.log(error);
    //         throw new InternalServerErrorException({
    //             ...error.response,
    //         });
    //     }
    // }
}
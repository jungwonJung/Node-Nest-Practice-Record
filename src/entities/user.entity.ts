import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user', schema: 'nest-mall' })
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 64 })
    userEmail: string;

    @Column({ length: 64 })
    userName: string;

    @Column({ length: 64 })
    userPassword: string;

    @Column({ default: 10000 })
    userPoint: number;
}

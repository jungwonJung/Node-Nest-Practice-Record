import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user', schema: 'nest-mall' })
export class User {
    /**
     * 회원고유id
     */
    @PrimaryGeneratedColumn()
    userId: number;

    /**
     * 회원이메일
     */
    @Column({ length: 64 })
    userEmail: string;

    /**
     * 회원이름
     */
    @Column({ length: 64 })
    userName: string;

    /**
     * 회원 비밀번호
     */
    @Column({ length: 64 })
    userPassword: string;

    /**
     * 회원 전화번호
     */
    @Column({ length: 64 })
    userPhone: string;
}

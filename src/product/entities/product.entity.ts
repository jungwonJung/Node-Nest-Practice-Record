import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'product',
    schema: 'nest-mall',
    orderBy: { productPrice: 'DESC' },
})
export class Product {
    @PrimaryGeneratedColumn()
    productId: string;

    @Column({ length: 64 })
    productTitle: string;

    @Column({ length: 64 })
    productCategory: string;

    @Column({ length: 64 })
    productImage: string;

    @Column({ length: 64 })
    productDescription: string;

    @Column()
    productPrice: number;
}

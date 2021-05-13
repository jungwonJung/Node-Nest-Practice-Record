import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
    name: 'product',
    schema: 'nest-mall',
    orderBy: { productTitle: 'DESC' },
})
export class Product {
    @PrimaryGeneratedColumn()
    productId: number;

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

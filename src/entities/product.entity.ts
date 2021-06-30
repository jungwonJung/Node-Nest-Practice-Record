import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({
    name: 'product',
    schema: 'nest-mall',
    orderBy: { productTitle: 'DESC' },
})
/**
 * 상품 관련 entity
 */
export class Product {
    /**
     * 상품 고유 id
     */
    @PrimaryGeneratedColumn()
    productId: number;

    /**
     * 상품 이미지
     */
    @Column({ length: 64 })
    productImage: string;

    /**
     * 상품 무료배송여부
     */
    @Column()
    productFreeDelivery: boolean;

    /**
     * 상품이름
     */
    @Column({ length: 64 })
    productTitle: string;

    /**
     * 상품 할인율
     */
    @Column({ length: 64 })
    discountPer: string;

    /**
     * 상품가격
     */
    @Column()
    productPrice: number;

    /**
     * 상품할인적용된가격
     */
    @Column()
    productDiscountPrice: number;

    /**
     * 상품평점
     */
    @Column()
    productScore: number;

    /**
     * 삭제여부
     */
    @Column({ default: false })
    isDeleted: boolean;

    /**
     * 생성일자
     */
    @CreateDateColumn()
    createdAt: Date;

    /**
     * 수정일자
     */
    @UpdateDateColumn()
    updatedAt: Date;
}

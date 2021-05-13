import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity({ name: 'purchase', schema: 'nest-mall' })
export class Purchase {
    @PrimaryGeneratedColumn()
    purchaseId: number;

    @CreateDateColumn()
    createdAt: Date;
}

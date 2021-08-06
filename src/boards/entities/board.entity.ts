import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Board' })
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'char', length: 36 })
  userId: string;

  @Column({ type: 'varchar', length: 60 })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'int', default: 0 })
  like: number;

  @Column({ type: 'boolean', default: false })
  isLiked: boolean;

  @ManyToOne(() => User, (user) => user.board, {
    primary: false,
  })
  @JoinColumn({ name: 'user' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

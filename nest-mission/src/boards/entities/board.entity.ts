import { LikeRecord } from 'src/like/entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => LikeRecord, (likeRecord) => likeRecord.board, {
    primary: false,
  })
  likeRecord: LikeRecord;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

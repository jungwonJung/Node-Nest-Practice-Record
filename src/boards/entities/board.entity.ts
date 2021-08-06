import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'Board' })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  like: number;

  @ManyToOne(() => User, (user) => user.board, {
    primary: false,
  })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

import { Board } from 'src/boards/entities/board.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 64 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  nickname: string;

  @Column({ type: 'varchar', length: 64 })
  password: string;

  @OneToMany(() => Board, (board) => board.user, {
    primary: false,
  })
  board: Board;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

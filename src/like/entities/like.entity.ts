import { Board } from 'src/boards/entities/board.entity';
import { User } from 'src/users/entities/user.entity';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'likeRecord' })
export class LikeRecord extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Board, (board) => board.likeRecord, {
    primary: false,
  })
  @JoinColumn({ name: 'boardId' })
  board: Board;

  @ManyToOne(() => User, (user) => user.likeRecord, {
    primary: false,
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}

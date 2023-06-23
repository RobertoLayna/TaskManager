import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Task } from './task.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  id_user: number;

  @ManyToOne(() => User, (user) => user.shared)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @Column()
  id_task: number;

  @ManyToOne(() => Task, (task) => task.shareds)
  @JoinColumn({ name: 'id_task' })
  task: Task;

  @Column()
  comment: string;
}

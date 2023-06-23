import { Status } from 'src/status/entities/status.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tag } from './tag.entity';
import { File } from './file.entity';
import { Shared } from './shared.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn({})
  id?: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  deadline_date: Date;

  @Column({ nullable: false })
  is_private: boolean;

  @Column({ nullable: false, unique: false })
  id_owner: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'id_owner' })
  owner?: User;

  @Column({ nullable: true, unique: false })
  id_responsible: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'id_responsible' })
  responsible?: User;

  @OneToOne(() => File)
  @JoinColumn()
  file?: File;

  @Column({ nullable: false, default: 0, unique: false })
  id_status: number;

  @ManyToOne(() => Status, { nullable: false })
  @JoinColumn({ name: 'id_status' })
  status?: Status;

  @OneToMany(() => Shared, (shared) => shared.task, {
    cascade: ['insert', 'remove'],
  })
  shareds?: Shared[];

  @OneToMany(() => Tag, (tag) => tag.task, { cascade: ['insert', 'remove'] })
  tags?: Tag[];
}

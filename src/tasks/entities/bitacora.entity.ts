import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bitacora {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  id_user: number;

  @Column()
  id_task: number;

  @Column()
  action: string;
}

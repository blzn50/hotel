import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Room } from './Room';
import { User } from './User';

@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('date')
  arrival!: Date;

  @Column('date')
  departure!: Date;

  @Column()
  status: string;

  // @Column()
  // reservedBy: string;

  @Column()
  guestId: number;

  @ManyToOne(() => User, (user) => user.reservations)
  guest: User;

  @OneToMany(() => Room, (room) => room.reserved)
  rooms: Room[];
}

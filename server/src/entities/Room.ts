import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './Reservation';

export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  FAMILY = 'family',
  SUITE = 'suite',
}

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'enum', enum: RoomType, default: RoomType.SINGLE })
  type: RoomType;

  @Column()
  roomNumber: number;

  @Column('numeric')
  price: number;

  @Column()
  isAvailable: boolean;

  @PrimaryColumn({ default: 0 })
  reservationId: number;

  @ManyToOne(() => Reservation, (reservation) => reservation.rooms)
  reserved: Reservation;
}

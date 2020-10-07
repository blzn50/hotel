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
import { IsDate, Min } from 'class-validator';
import { Room } from './Room';
import { User } from './User';

export enum ReservationStatus {
  BOOKED = 'booked',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
}
@Entity()
export class Reservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('date')
  @IsDate({ message: 'Arrival must be a valid date' })
  arrival: Date;

  @Column('date')
  @IsDate({ message: 'Departure must be a valid date' })
  departure: Date;

  @Column({ type: 'enum', enum: ReservationStatus, default: ReservationStatus.BOOKED })
  status: ReservationStatus;

  @Column()
  @Min(1, { message: 'At least 1 guest must be selected' })
  guestNumber: number;

  @Column()
  guestId: number;

  @ManyToOne(() => User, (user) => user.reservations)
  guest: User;

  @Column()
  roomNumber: number;

  @OneToMany(() => Room, (room) => room.reserved)
  rooms: Room[];
}

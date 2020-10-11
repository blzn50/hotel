import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';
import { Reservation } from './Reservation';

export enum UserType {
  GUEST = 'guest',
  MANAGER = 'manager',
  RECEPTIONIST = 'receptionist',
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: UserType, default: UserType.GUEST })
  userType: UserType;

  @Column({ default: false })
  isAdmin: boolean;

  @Column()
  @MinLength(2, { message: 'First name must be at least 2 characters long.' })
  firstName: string;

  @Column()
  @MinLength(2, { message: 'Last name must be at least 2 characters long.' })
  lastName: string;

  @Column({ unique: true })
  @IsEmail({}, { message: 'Email must be valid' })
  email: string;

  @Column()
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  password: string;

  @OneToMany(() => Reservation, (reservation) => reservation.guest)
  reservations: Reservation[];

  @Column({ nullable: true })
  passwordResetToken: string;
}

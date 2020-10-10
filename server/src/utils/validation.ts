/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../entities/User';
import { Reservation } from '../entities/Reservation';
import { toValidation } from './toValidation';

const toNewUser = async (object: any): Promise<User> => {
  const newUser = new User();

  newUser.firstName = object.firstName;
  newUser.lastName = object.lastName;
  newUser.email = object.email;
  newUser.password = object.password;

  return (toValidation(newUser) as any) as User;
};

const toNewReservation = async (object: any): Promise<Reservation> => {
  const newReservation = new Reservation();

  newReservation.arrival = new Date(object.arrival);
  newReservation.departure = new Date(object.departure);
  newReservation.guestNumber = object.guestNumber;
  newReservation.totalRoomsBooked = object.totalRoomsBooked;

  return (toValidation(newReservation) as any) as Reservation;
};

export { toNewUser, toNewReservation };

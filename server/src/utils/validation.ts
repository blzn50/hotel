/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { validate, ValidationError } from 'class-validator';
import { CustomError } from '../types';
import { User } from '../entities/User';
import { Reservation } from '../entities/Reservation';

const toNewUser = async (object: any): Promise<User> => {
  const newUser = new User();

  newUser.firstName = object.firstName;
  newUser.lastName = object.lastName;
  newUser.email = object.email;
  newUser.password = object.password;

  const errors: ValidationError[] = await validate(newUser);

  if (errors.length > 0) {
    const message = errors
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((error: ValidationError) => Object.values(error.constraints!).join(''));

    throw new CustomError('ValidationError', message);
  } else {
    return newUser;
  }
};

const toNewReservation = async (object: any): Promise<Reservation> => {
  const newReservation = new Reservation();

  newReservation.arrival = object.arrival;
  newReservation.departure = object.departure;
  newReservation.guestNumber = object.guestNumber;
  newReservation.totalRoomsBooked = object.totalRoomsBooked;

  const errors: ValidationError[] = await validate(newReservation);
  console.log('errors: ', errors);

  if (errors.length > 0) {
    const message = errors
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((error: ValidationError) => Object.values(error.constraints!).join(''));

    throw new CustomError('ValidationError', message);
  } else {
    return newReservation;
  }
};
export { toNewUser, toNewReservation };

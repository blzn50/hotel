/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../entities/User';
import { Reservation } from '../entities/Reservation';
import { toValidation } from './toValidation';
import { ResetPasswordDTO } from '../entities/ResetPassword.dto';

const toNewUser = async (object: any): Promise<User> => {
  const newUser = new User();

  newUser.firstName = object.firstName;
  newUser.lastName = object.lastName;
  newUser.email = object.email;
  newUser.password = object.password;

  return (await (toValidation(newUser) as unknown)) as User;
};

const toNewReservation = async (object: any): Promise<Reservation> => {
  const newReservation = new Reservation();

  newReservation.arrival = new Date(object.arrival);
  newReservation.departure = new Date(object.departure);
  newReservation.guestNumber = object.guestNumber;
  newReservation.totalRoomsBooked = object.totalRoomsBooked;

  return (await (toValidation(newReservation) as unknown)) as Reservation;
};

const toResetPassword = async (object: any): Promise<ResetPasswordDTO> => {
  const newPassword = new ResetPasswordDTO();

  newPassword.password = object.password;

  return (await (toValidation(newPassword) as unknown)) as ResetPasswordDTO;
};
export { toNewUser, toNewReservation, toResetPassword };

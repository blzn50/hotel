import { validate, ValidationError } from 'class-validator';
import { getManager } from 'typeorm';
import { Reservation } from '../entities/Reservation';
import { CustomError, ReservationInfo } from '../types';

const bookReservation = async (reservation: ReservationInfo) => {
  const newReservation = new Reservation();
  newReservation.arrival = reservation.arrival;
  newReservation.departure = reservation.departure;
  newReservation.guestNumber = reservation.guestNumber;

  const errors = await validate(newReservation);

  if (errors.length > 0) {
    const message = errors
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((error: ValidationError) => Object.values(error.constraints!).join(''));

    throw new CustomError('ValidationError', message);
  } else {
    return await getManager().transaction(async (tm) => {
      await tm.query(`
      
      `);
    });
  }
};

export default { bookReservation };

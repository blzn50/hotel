import { getManager, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { Room } from '../entities/Room';
import { Reservation, ReservationStatus } from '../entities/Reservation';

const bookReservation = async (
  newReservation: Reservation,
  email: string,
  rooms: number[],
  token: string
): Promise<{
  bookedReservation: Reservation;
  totalPrice: number;
}> => {
  // get userRepository and roomRepository from entity manager
  const userRepository = getRepository(User);
  const roomRepository = getRepository(Room);

  // find user
  const user = await userRepository.findOneOrFail({ email, refreshToken: token });

  // checking if the rooms are actually available/exists
  const returnedRoomNumbers = rooms.map(async (roomNumber) => {
    await roomRepository.findOneOrFail({ roomNumber, isAvailable: true });
    return roomNumber;
  });

  // get total cost of the reserved rooms
  const totalPrice = await roomRepository
    .createQueryBuilder()
    .select('SUM(price) as "totalPrice"')
    .where('"roomNumber" IN (:...roomNumbers)', { roomNumbers: returnedRoomNumbers })
    .execute();

  console.log('totalPrice: ', totalPrice);
  // update room status with reservationId
  const { raw } = await roomRepository
    .createQueryBuilder('room')
    .update()
    .set({ isAvailable: false, reservationId: newReservation.id })
    .where('"roomNumber" IN (:...roomNumbers)', { roomNumbers: returnedRoomNumbers })
    .returning('*')
    .execute();

  // price need to be included
  newReservation.status = ReservationStatus.BOOKED;
  newReservation.guestId = user.id;
  newReservation.rooms = raw;

  const bookedReservation = await getManager().save(newReservation);

  return { bookedReservation, totalPrice };
};

const confirmReservation = async () => {
  const reservationRepository = getRepository(Reservation);
};

export default { bookReservation, confirmReservation };

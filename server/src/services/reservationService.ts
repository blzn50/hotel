import { User } from '../entities/User';
import { Room } from '../entities/Room';
import { getManager, getRepository } from 'typeorm';
import { Reservation, ReservationStatus } from '../entities/Reservation';

const bookReservation = async (
  newReservation: Reservation,
  userId: number,
  rooms: number[]
): Promise<Reservation> => {
  // get user from db
  const userRepository = getRepository(User);
  const roomRepository = getRepository(Room);
  const user = await userRepository.findOneOrFail({ id: userId });

  // checking if the rooms are actually available/exists
  const returnedRoomNumbers = rooms.map(async (roomNumber) => {
    await roomRepository.findOneOrFail({ roomNumber, isAvailable: true });
    return roomNumber;
  });

  // update room status with reservationId
  const updatedRooms = await roomRepository
    .createQueryBuilder('room')
    .update()
    .set({ isAvailable: false, reservationId: newReservation.id })
    .where('roomNumber = :roomNumber', { roomNumber: returnedRoomNumbers })
    .returning('*')
    .execute();

  newReservation.status = ReservationStatus.BOOKED;
  newReservation.guestId = user.id;
  newReservation.rooms = updatedRooms.raw;
  return await getManager().save(newReservation);
};

export default { bookReservation };

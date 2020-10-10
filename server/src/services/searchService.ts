/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getManager, getRepository } from 'typeorm';
import { Room, RoomType } from '../entities/Room';
import { SearchObject } from '../types';

const findRooms = async (object: any): Promise<Room[]> => {
  // const roomRepository = getRepository(Room);
  const searchObject: SearchObject = {
    arrival: object.arrival,
    departure: object.departure,
    roomType: object.roomType,
    guestNumber: object.guestNumber,
    noOfRoom: object.noOfRoom,
  };

  const replacements = [searchObject.arrival, searchObject.departure, true, searchObject.roomType];

  if (searchObject.roomType === 'all') {
    replacements.splice(
      3,
      1,
      RoomType.SINGLE,
      RoomType.DOUBLE,
      RoomType.TRIPLE,
      RoomType.FAMILY,
      RoomType.SUITE
    );
  }
  const data = await getManager().query(
    `
    SELECT room.id, room."roomNumber", room.price, room.type FROM room
    WHERE  EXISTS 
        (SELECT 
        1 FROM reservation r
        WHERE (r.arrival NOT BETWEEN  $1 AND  $2) AND (r.departure NOT BETWEEN   $1 AND  $2)
        )
        AND room."isAvailable" = $3 
        ${replacements[5] ? `AND room.type IN ($4, $5, $6, $7,$8)` : `AND room.type IN ($4)`}
    `,
    replacements
  );

  console.log(data);
  return data as Room[];
};

export default { findRooms };

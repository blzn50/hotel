/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { getManager, getRepository } from 'typeorm';
import { Room, RoomType } from '../entities/Room';
import { SearchObject } from '../types';

const findRooms = async (
  object: any
): Promise<{
  data: Room[];
  moreData: Room[];
}> => {
  // const roomRepository = getRepository(Room);
  const searchObject: SearchObject = {
    arrival: object.arrival,
    departure: object.departure,
    roomType: object.roomType,
    guestNumber: object.guestNumber,
    noOfRoom: object.noOfRoom,
  };

  const replacements = [searchObject.arrival, searchObject.departure, true, searchObject.roomType];
  const moreReplacements = [...replacements];

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

  const data: Room[] = await getManager().query(
    `
    SELECT room.id, room."roomNumber", room.price, room.type, room.name, room.description, room."maxCapacity" FROM room
    WHERE  EXISTS
        (SELECT
        1 FROM reservation r
        WHERE (r.arrival NOT BETWEEN  $1 AND  $2) AND (r.departure NOT BETWEEN   $1 AND  $2) 
        )
        AND room."isAvailable" = $3 AND $1 >=now()::date AND $2 >= now()::date + 1
        ${replacements[5] ? `AND room.type IN ($4, $5, $6, $7,$8)` : `AND room.type IN ($4)`}
    `,
    replacements
  );

  // get sum of maxCapacity of all rooms
  const sum = await getManager().query(
    `
    SELECT SUM("maxCapacity") FROM room WHERE type = $1 AND "isAvailable" = true
    `,
    [searchObject.roomType]
  );

  // in case guest number is greater than total room capacity
  let moreData: Room[] = [];
  if (sum[0].sum < searchObject.guestNumber) {
    const additionalRoomTypes = [RoomType.SINGLE, RoomType.DOUBLE, RoomType.TRIPLE];
    moreReplacements.pop();
    moreReplacements.push(
      ...additionalRoomTypes.filter((roomToFilter) => roomToFilter !== searchObject.roomType)
    );

    moreData = await getManager().query(
      `
      SELECT room.id, room."roomNumber", room.price, room.type, room.name, room.description, room."maxCapacity" FROM room
      WHERE  EXISTS
      (SELECT
        1 FROM reservation r
        WHERE (r.arrival NOT BETWEEN  $1 AND  $2) AND (r.departure NOT BETWEEN   $1 AND  $2)
        )
        AND room."isAvailable" = $3
        AND room.type IN ($4, $5)
        `,
      moreReplacements
    );
  }

  console.log('moreData: ', moreData);
  return { data, moreData };
};

export default { findRooms };

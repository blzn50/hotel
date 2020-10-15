export enum RoomType {
  SINGLE = 'single',
  DOUBLE = 'double',
  TRIPLE = 'triple',
  FAMILY = 'family',
  SUITE = 'suite',
}

export type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ResetPasswordData = {
  password: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  reservations?: Reservation[];
};

export type UserResponse = {
  token: string;
  user: User;
};

export enum ReservationStatus {
  BOOKED = 'booked',
  CONFIRMED = 'confirmed',
  CANCELED = 'canceled',
}

export type Room = {
  id: number;
  type: RoomType;
  roomNumber: number;
  price: number;
  isAvailable: boolean;
  reservationId: number;
  reserved: Reservation;
};

export type Reservation = {
  id: number;
  arrival: string;
  departure: string;
  status: ReservationStatus;
  guestNumber: number;
  guestId: number;
  totalRoomsBooked: number;
  rooms: Room[];
};

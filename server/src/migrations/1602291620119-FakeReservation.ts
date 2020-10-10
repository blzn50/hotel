import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakeReservation1602291620119 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
insert into reservation (arrival, departure, "guestNumber", "guestId", "totalRoomsBooked") values ('19/11/2020', '26/12/2020', 1, 1, 4);
insert into reservation (arrival, departure, "guestNumber", "guestId", "totalRoomsBooked") values ('17/10/2020', '29/11/2020', 3, 2, 3);
insert into reservation (arrival, departure, "guestNumber", "guestId", "totalRoomsBooked") values ('05/11/2020', '06/11/2020', 4, 1, 1);
insert into reservation (arrival, departure, "guestNumber", "guestId", "totalRoomsBooked") values ('18/11/2020', '23/11/2020', 8, 1, 3);
insert into reservation (arrival, departure, "guestNumber", "guestId", "totalRoomsBooked") values ('13/12/2020', '16/12/2020', 2, 2, 1);

        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}

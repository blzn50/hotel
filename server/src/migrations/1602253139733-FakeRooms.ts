import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakeRooms1602253139733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        insert into room (type, "roomNumber", "isAvailable", price) values ('single', 22, true, 64);
        insert into room (type, "roomNumber", "isAvailable", price) values ('triple', 36, false, 186);
        insert into room (type, "roomNumber", "isAvailable", price) values ('triple', 58, false, 246);
        insert into room (type, "roomNumber", "isAvailable", price) values ('triple', 43, true, 268);
        insert into room (type, "roomNumber", "isAvailable", price) values ('double', 48, true, 148);
        insert into room (type, "roomNumber", "isAvailable", price) values ('triple', 58, false, 269);
        insert into room (type, "roomNumber", "isAvailable", price) values ('double', 30, false, 138);
        insert into room (type, "roomNumber", "isAvailable", price) values ('triple', 48, false, 209);
        insert into room (type, "roomNumber", "isAvailable", price) values ('double', 11, false, 166);
        insert into room (type, "roomNumber", "isAvailable", price) values ('triple', 53, true, 254);
        insert into room (type, "roomNumber", "isAvailable", price) values ('single', 48, true, 59);
        insert into room (type, "roomNumber", "isAvailable", price) values ('family', 59, true, 336);
        insert into room (type, "roomNumber", "isAvailable", price) values ('family', 54, false, 339);
        insert into room (type, "roomNumber", "isAvailable", price) values ('family', 53, true, 215);
        insert into room (type, "roomNumber", "isAvailable", price) values ('family', 18, true, 338);
        insert into room (type, "roomNumber", "isAvailable", price) values ('double', 59, true, 114);
        insert into room (type, "roomNumber", "isAvailable", price) values ('suite', 48, true, 381);
        insert into room (type, "roomNumber", "isAvailable", price) values ('triple', 29, true, 277);
        insert into room (type, "roomNumber", "isAvailable", price) values ('suite', 14, false, 463);
        insert into room (type, "roomNumber", "isAvailable", price) values ('double', 26, false, 149);
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}

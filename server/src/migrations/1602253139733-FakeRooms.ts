import { MigrationInterface, QueryRunner } from 'typeorm';

export class FakeRooms1602253139733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    246;
    await queryRunner.query(`
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('single', 'Deluxe Room One Queen Bed' ,22, true, 64);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('triple', 'Deluxe Room Three Single Beds',36, false, 186);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('triple', 'Executive Room Three Queen Beds',58, false, 269);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('triple', 'Executive Room Three Queen Beds',43, true, 268);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('double', 'Deluxe Room One King Bed',37, true, 148);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('double', 'Deluxe Room One King Bed',30, false, 138);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('triple', 'Deluxe Room Three Queen Beds',48, false, 209);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('double', 'Executive Room One King Bed',11, false, 166);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('triple', 'Executive Room Three Queen Beds',25, true, 254);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('single', 'Deluxe Room One Single Bed' ,13, true, 59);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('family', 'Feels Like Home Family Suite',44, true, 336);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('family', 'Theme Park Family Suite',54, false, 339);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('family', 'Close To Home Family Suite',53, true, 215);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('family', 'Top Of The World Family Suite',18, true, 338);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('double', 'Deluxe Room One King Bed',59, true, 114);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('suite', 'Extravaganza Business Suite',35, true, 381);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('triple', 'Executive Room Three Queen Beds',29, true, 277);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('suite', 'Super Extravagant Business Class Suite',14, false, 463);
        insert into room (type,name, "roomNumber", "isAvailable", price) values ('double', 'Deluxe Room One King Bed',26, false, 149);
        `);
  }
  // update room set "maxCapacity" =
  // case "roomNumber"
  // when 58 then 6
  // when 22 then 1
  // when 36 then 3
  // when 43 then 6
  // when 37 then 2
  // when 30 then 2
  // when 48 then 4
  // when 11 then 2
  // when 25 then 6
  // when 13 then 1
  // when 44 then 5
  // when 54 then 6
  // when 53 then 4
  // when 18 then 6
  // when 59 then 2
  // when 35 then 3
  // when 29 then 4
  // when 14 then 4
  // when 26 then 2
  // end
  // where "roomNumber" in (58,
  //   22,
  //   36,
  //   43,
  //   37,
  //   30,
  //   48,
  //   11,
  //   25,
  //   13,
  //   44,
  //   54,
  //   53,
  //   18,
  //   59,
  //   35,
  //   29,
  //   14,
  //   26);

  public async down(_: QueryRunner): Promise<void> {}
}

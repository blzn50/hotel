import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import path from 'path';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import middleware from './utils/middleware';
import { Reservation } from './entities/Reservation';
import { Room } from './entities/Room';
import { User } from './entities/User';
import { userRouter } from './routes/user';
import { searchRouter } from './routes/search';
import { reservationRouter } from './routes/reservation';

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // logging: true,
    entities: [User, Reservation, Room],
    migrations: [path.join(__dirname, './migrations/*')],
    synchronize: true,
  });
  await conn.runMigrations();

  const app = express();
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(express.json());
  app.use(helmet());
  app.use(morgan('short'));
  app.use(middleware.getToken);

  app.get('/', (_req, res) => {
    res.send('hello world');
  });

  app.use('/', searchRouter);
  app.use('/reservation', reservationRouter);
  app.use('/user', userRouter);
  app.use(middleware.errorHandler);

  app.listen(parseInt(process.env.PORT || '4000'), () => {
    console.log('server started on port ' + process.env.PORT);
  });
};

main();

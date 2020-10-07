import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createConnection } from 'typeorm';

import middleware from './utils/middleware';
import { Reservation } from './entities/Reservation';
import { Room } from './entities/Room';
import { User } from './entities/User';
import { userRouter } from './routes/user';

const main = async () => {
  await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // logging: true,
    entities: [User, Reservation, Room],
    synchronize: true,
  });

  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.use(morgan('short'));
  app.use(middleware.getToken);

  app.get('/', (_req, res) => {
    res.send('hello world');
  });

  app.use('/user', userRouter);
  app.use(middleware.errorHandler);

  app.listen(parseInt(process.env.PORT || '4000'), () => {
    console.log('server started on port ' + process.env.PORT);
  });
};

main();

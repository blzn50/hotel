import { Router, Request, Response } from 'express';
import { toNewReservation } from '../utils/validation';
import reservationService from '../services/reservationService';
import middleware from '../utils/middleware';

const reservationRouter = Router();

reservationRouter.post('/book', [middleware.checkJWT], async (req: Request, res: Response) => {
  const { rooms }: { rooms: number[] } = req.body;
  const newReservation = await toNewReservation(req.body);
  const { token }: { token: string } = req;
  const { email }: { email: string } = res.locals.jwtPayload;

  const reservation = await reservationService.bookReservation(newReservation, email, rooms, token);

  res.status(200).send(reservation);
});

// dummy router for now
reservationRouter.get('/update', async (_req, res) => {
  const data = await reservationService.confirmReservation();
  res.status(200).send('success');
});

export { reservationRouter };

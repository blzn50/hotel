import express from 'express';
import { toNewReservation } from '../utils/validation';
import reservationService from '../services/reservationService';

const reservationRouter = express.Router();

reservationRouter.post('/reservation', async (req, res, next) => {
  const newReservation = await toNewReservation(req.body);

  const reservation = await reservationService.bookReservation(newReservation);
});

import { Router } from 'express';
import searchService from '../services/searchService';

const searchRouter = Router();

searchRouter.post('/search', async (req, res) => {
  const { data, moreData } = await searchService.findRooms(req.body);

  res.status(200).json({ data, moreData });
});

export { searchRouter };

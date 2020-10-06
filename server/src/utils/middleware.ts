import { Request, Response, NextFunction } from 'express';
import { Error } from '../types';

const getToken = (req: Request, _res: Response, next: NextFunction) => {
  let token = null;
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }
  req.token = token;
  return next();
};

const errorHandler = (error: Error, _req: Request, res: Response, next: NextFunction) => {
  if (error.code === '23505') {
    return res.status(400).send({
      errors: [{ field: 'username', message: 'Username already taken' }],
    });
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' });
  }

  return next(error);
};

export default { errorHandler, getToken };

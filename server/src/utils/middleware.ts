/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { CustomError, JWTObject } from '../types';
import { UserType, User } from '../entities/User';
import { getRepository } from 'typeorm';

const getToken = (req: Request, _res: Response, next: NextFunction) => {
  let token = '';
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    token = authorization.substring(7);
  }
  req.token = token;
  next();
};

const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  const jwtPayload = <JWTObject>jwt.verify(req.token, process.env.JWT_SECRET || 'fdafsafagasgve');
  res.locals.jwtPayload = jwtPayload;

  // to send jwt on every request
  // const {email, userId} = jwtPayload;
  // const newToken = jwt.sign({email, userId}, process.env.JWT_SECRET || 'fdafsafagasgve', {expiresIn: '2h'});
  // res.setHeader('authorization', `Bearer ${newToken}`)

  next();
};

const checkRole = (roles: UserType[]) => {
  return async (_req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.userId;

    // get user role from the database
    const userRepository = getRepository(User);
    const user: User = await userRepository.findOneOrFail(id);

    // check if array of authorized roles includes in the user's role
    if (roles.indexOf(user.userType) > -1) next();
    else res.status(401).send();
  };
};

const errorHandler = (error: CustomError, _req: Request, res: Response, next: NextFunction) => {
  // console.log('error: ', error);

  if (error.code === '23505') {
    res.status(400).send({ error: ['Username already taken'] });
  } else if (error.name === 'JsonWebTokenError') {
    res.status(401).json({ error: ['Invalid token'] });
  } else if (error.name === 'TokenExpiredError') {
    res.status(401).json({ error: ['Token expired'] });
  } else if (error.name === 'ValidationError') {
    res.status(401).json({ error: error.elaborateMessage });
  }
  // res.status(400).json({ errors });
  // return;
  next(error);
};

export default { errorHandler, getToken, checkJWT, checkRole };

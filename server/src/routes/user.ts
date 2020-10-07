import express from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';
import { LoginInfo, RegisterInfo } from '../types';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  const { firstName, lastName, email, password }: RegisterInfo = req.body;

  const newUser = await userService.registerUser({ firstName, lastName, email, password });

  const userForToken = {
    email: newUser.email,
    userId: newUser.id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET || 'fdafsafagasgve', {
    expiresIn: '2h',
  });

  return res.status(200).send({ token, email: newUser.email });
});

userRouter.post('/login', async (req, res) => {
  const { email, password }: LoginInfo = req.body;

  if (!(email && password)) {
    res.status(400).send();
  }

  const { user, validPassword } = await userService.loginUser({ email, password });
  if (!(user && validPassword)) {
    return res.status(401).json({ error: 'Username or Password error' });
  }

  const userForToken = {
    email: user.email,
    userId: user.id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET || 'fdafsafagasgve', {
    expiresIn: '2h',
  });

  return res.status(200).send({ token, email: user.email });
});

export { userRouter };

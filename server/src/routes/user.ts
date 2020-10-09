import express from 'express';
import { toNewUser } from '../utils/validation';
import userService from '../services/userService';
import { LoginInfo } from '../types';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  const newUser = await toNewUser(req.body);

  const { registeredUser, token } = await userService.registerUser(newUser);

  return res.status(200).send({ token, email: registeredUser.email });
});

userRouter.post('/login', async (req, res) => {
  const { email, password }: LoginInfo = req.body;

  if (!(email && password)) {
    res.status(401).send({ error: 'Please fill email/password field' });
  }

  const { user, token } = await userService.loginUser({ email, password });

  return res.status(200).send({ token, email: user.email });
});

export { userRouter };

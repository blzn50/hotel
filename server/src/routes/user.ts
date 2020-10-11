import { Router } from 'express';
import { toNewUser } from '../utils/validation';
import userService from '../services/userService';
import { ForgotPasswordDTO, LoginInfo } from '../types';

const userRouter = Router();

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

userRouter.post('/forgot-password', async (req, res) => {
  const { email }: ForgotPasswordDTO = req.body;

  await userService.forgotPassword(email);

  res.status(200).send();
  // res.status(200).send({ message: 'If the user exists, then an email has been sent' });
});

export { userRouter };

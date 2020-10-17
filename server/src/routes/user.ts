import { Router } from 'express';
import { toNewUser, toResetPassword } from '../utils/validation';
import userService from '../services/userService';
import { ForgotPasswordDTO, LoginInfo } from '../types';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const newUser = await toNewUser(req.body);

  const { registeredUserWithToken, token } = await userService.registerUser(newUser);

  return res.status(200).send({
    token,
    user: {
      email: registeredUserWithToken.email,
      firstName: registeredUserWithToken.firstName,
      lastName: registeredUserWithToken.lastName,
    },
  });
});

userRouter.post('/login', async (req, res) => {
  const { email, password }: LoginInfo = req.body;

  if (!(email && password)) {
    res.status(401).send({ error: 'Please fill email/password field' });
  }

  const { userWithToken, token } = await userService.loginUser({ email, password });

  return res.status(200).send({
    token,
    user: {
      email: userWithToken.email,
      firstName: userWithToken.firstName,
      lastName: userWithToken.lastName,
    },
  });
});

userRouter.post('/forgot-password', async (req, res) => {
  const { email }: ForgotPasswordDTO = req.body;

  await userService.forgotPassword(email);

  res.status(200).send('success');
  // res.status(200).send({ message: 'If the user exists, then an email has been sent' });
});

userRouter.post('/reset-password', async (req, res) => {
  const { token } = req.params;
  const { password } = await toResetPassword(req.body);

  const user = await userService.changePassword(token, password);

  if (user) {
    return res.status(200).send('success');
  }
  return res.status(400).send('error');
});

userRouter.post('/logout', async (req, res) => {
  const { token }: { token: string } = req;
  await userService.logoutUser(token);

  res.status(200).send('logout');
});
export { userRouter };

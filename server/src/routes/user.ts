import { Router } from 'express';
import { toNewUser, toResetPassword } from '../utils/validation';
import userService from '../services/userService';
import { ForgotPasswordDTO, LoginInfo } from '../types';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const newUser = await toNewUser(req.body);

  const { registeredUser, token } = await userService.registerUser(newUser);

  return res
    .status(200)
    .send({
      token,
      user: {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
      },
    });
});

userRouter.post('/login', async (req, res) => {
  const { email, password }: LoginInfo = req.body;

  if (!(email && password)) {
    res.status(401).send({ error: 'Please fill email/password field' });
  }

  const { user, token } = await userService.loginUser({ email, password });

  return res
    .status(200)
    .send({
      token,
      user: { email: user.email, firstName: user.firstName, lastName: user.lastName },
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

export { userRouter };

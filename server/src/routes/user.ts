import express from 'express';
import jwt from 'jsonwebtoken';
import userService from '../services/userService';
import { registerValidation } from '../utils/validation';
import { RegisterInfo } from '../types';
import { LoginInfo } from '../types';

const userRouter = express.Router();

userRouter.post('/register', async (req, res) => {
  const { username, email, password }: RegisterInfo = req.body;
  const errors = registerValidation({ username, email, password });

  if (errors) {
    return res.status(400).json({ errors });
  }
  const newUser = await userService.registerUser({ username, email, password });

  const userForToken = {
    username: newUser.username,
    id: newUser.id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET || 'fdafsafagasgve');

  return res.status(200).send({ token, username: newUser.username });
});

userRouter.post('/login', async (req, res) => {
  const { usernameOrEmail, password }: LoginInfo = req.body;

  const { user, validPassword } = await userService.loginUser({ usernameOrEmail, password });
  if (!(user && validPassword)) {
    return res.status(401).json({
      errors: [{ message: 'username or password error.' }],
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET || 'fdafsafagasgve', {
    expiresIn: '2 hours',
  });

  return res.status(200).send({ token, username: user.username });
});

export { userRouter };

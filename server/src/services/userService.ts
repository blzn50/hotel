import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { getManager } from 'typeorm';
import { User } from '../entities/User';
import { LoginInfo, CustomError, JWTObject } from '../types';
import { sendMail } from '../utils/sendEmail';

const registerUser = async (
  newUser: User
): Promise<{
  registeredUser: User;
  token: string;
}> => {
  const hashedPassword = await argon2.hash(newUser.password);
  newUser.password = hashedPassword;
  const registeredUser = await getManager().save(newUser);

  const userForToken = {
    email: registeredUser.email,
    userId: registeredUser.id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET || '', {
    expiresIn: '2h',
  });

  return { registeredUser, token };
};

const loginUser = async ({
  email,
  password,
}: LoginInfo): Promise<{
  user: User;
  token: string;
}> => {
  const user = await User.findOne({ email });

  const validPassword = user === undefined ? false : await argon2.verify(user.password, password);

  if (!(user && validPassword)) {
    throw new CustomError('LoginError', ['Username or Password error']);
  }

  const userForToken = {
    email: user.email,
    userId: user.id,
  };

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: '2h',
  });
  return { user, token };
};

const forgotPassword = async (email: string): Promise<boolean> => {
  const foundUser = await User.findOneOrFail({ where: { email } });

  if (!foundUser) {
    console.log('user not found');
    return true;
  }

  const emailForToken = {
    email: foundUser.email,
  };

  const secret = foundUser.password + '-' + foundUser.createdAt;
  const token = jwt.sign(emailForToken, secret, {
    expiresIn: '1h',
  });

  foundUser.passwordResetToken = token;
  await foundUser.save();

  const html = `<p>You are receiving this because you/someone else have requested the reset of the password for your account.</p>\n
                <p>Please click on the following link to complete the process within one hour of receiving it:</p>\n
                <a href="${process.env.CORS_ORIGIN}/reset-password/${token}">Reset Password</a>\n
                <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

  await sendMail(foundUser.email, html);
  return true;
};

const changePassword = async (token: string, newPassword: string): Promise<User | undefined> => {
  const foundUser = await User.findOneOrFail({ where: { passwordResetToken: token } });

  const secret = foundUser.password + '-' + foundUser.createdAt;
  const jwtPayload = <JWTObject>jwt.verify(token, secret);

  if (jwtPayload.email === foundUser.email) {
    foundUser.password = await argon2.hash(newPassword);
    await foundUser.save();
    return foundUser;
  }
  return;
};

export default { registerUser, loginUser, forgotPassword, changePassword };

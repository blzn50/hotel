import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { getManager } from 'typeorm';
import { User } from '../entities/User';
import { LoginInfo, CustomError } from '../types';

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

  const token = jwt.sign(userForToken, process.env.JWT_SECRET || 'fdafsafagasgve', {
    expiresIn: '2h',
  });

  return { registeredUser, token };
  // const result = await getConnection()
  //   .createQueryBuilder()
  //   .insert()
  //   .into(User)
  //   .values({
  //     name: {
  //       first: user.name.first,
  //       last: user.name.last,
  //     },
  //     email: user.email,
  //     password: hashedPassword,
  //   })
  //   .returning('*')
  //   .execute();
  // return result.raw[0];
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

  const token = jwt.sign(userForToken, process.env.JWT_SECRET || 'fdafsafagasgve', {
    expiresIn: '2h',
  });
  return { user, token };
};

export default { registerUser, loginUser };

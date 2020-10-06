import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import { User } from '../entities/User';
import { LoginInfo, RegisterInfo } from '../types';

const registerUser = async (user: RegisterInfo): Promise<User> => {
  const hashedPassword = await argon2.hash(user.password);

  const result = await getConnection()
    .createQueryBuilder()
    .insert()
    .into(User)
    .values({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    })
    .returning('*')
    .execute();
  return result.raw[0];
};

const loginUser = async ({
  usernameOrEmail,
  password,
}: LoginInfo): Promise<{
  user: User | undefined;
  validPassword: boolean;
}> => {
  const user = await User.findOne(
    usernameOrEmail.includes('@')
      ? { where: { email: usernameOrEmail } }
      : { where: { username: usernameOrEmail } }
  );

  const validPassword = user === undefined ? false : await argon2.verify(user.password, password);
  return { user, validPassword };
};

export default { registerUser, loginUser };

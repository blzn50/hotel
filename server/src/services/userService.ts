import argon2 from 'argon2';
import { getManager } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import { User } from '../entities/User';
import { LoginInfo, RegisterInfo, CustomError } from '../types';

const registerUser = async (user: RegisterInfo): Promise<User> => {
  const newUser = new User();

  newUser.firstName = user.firstName;
  newUser.lastName = user.lastName;
  newUser.email = user.email;
  newUser.password = user.password;

  // console.log('newUser: ', newUser);

  const errors: ValidationError[] = await validate(newUser);
  console.log('errors: ', errors);

  if (errors.length > 0) {
    const message = errors
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((error: ValidationError) => Object.values(error.constraints!).join(''));

    throw new CustomError('ValidationError', message);
  } else {
    const hashedPassword = await argon2.hash(user.password);
    newUser.password = hashedPassword;
    return await getManager().save(newUser);
  }
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
  user: User | undefined;
  validPassword: boolean;
}> => {
  const user = await User.findOne({ email });

  const validPassword = user === undefined ? false : await argon2.verify(user.password, password);
  return { user, validPassword };
};

export default { registerUser, loginUser };

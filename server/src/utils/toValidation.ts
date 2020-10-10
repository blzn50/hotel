import { ValidationError, validate } from 'class-validator';
import { CustomError } from '../types';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const toValidation = async (object: any) => {
  const errors: ValidationError[] = await validate(object);
  console.log('errors: ', errors);

  if (errors.length > 0) {
    const message = errors
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((error: ValidationError) => Object.values(error.constraints!).join(''));

    throw new CustomError('ValidationError', message);
  } else {
    return object;
  }
};

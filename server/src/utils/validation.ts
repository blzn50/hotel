import { FieldError, RegisterInfo } from '../types';

// Type guard -> returns boolean
const isString = (inputVal: any): inputVal is string => {
  return typeof inputVal === 'string' || inputVal instanceof String;
};

export const registerValidation = (options: RegisterInfo): FieldError[] | null => {
  // Basic validation
  const errors = Object.entries(options).map(([key, val]) => {
    if (!val || !isString(val)) {
      return { field: key, message: `Missing ${key} input` };
    }
    return;
  });

  const filteredErrors: FieldError[] = errors.filter(
    (error) => error !== undefined
  ) as FieldError[]; // type assertion for removing undefined

  if (filteredErrors.length > 0) {
    return filteredErrors;
  }

  // Other validations
  if (options.username.length <= 4) {
    return [{ field: 'username', message: 'Username must be longer than 4 characters' }];
  }

  if (options.username.includes('@')) {
    return [{ field: 'username', message: 'Username cannot include and @' }];
  }

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(options.email)) {
    return [{ field: 'email', message: 'Please input a valid email' }];
  }

  if (options.password.length <= 5) {
    return [{ field: 'password', message: 'Password must be longer than 5 characters' }];
  }

  return null;
};

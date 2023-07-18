import { test } from 'vitest';
import {
  UserAuthData,
  UserAuthRepository,
  UserAuthWithoutPassword,
} from '../../interfaces/user.interfaces';

type AuthExec = {
  exec: (data: UserAuthData) => Promise<UserAuthWithoutPassword | string>;
};

export type AuthTestContext = {
  inMemoryUserAuth: UserAuthRepository;
  signUp: AuthExec;
  signIn: AuthExec;
};

export const it = test<AuthTestContext>;

import { test } from 'vitest';
import {
  SignInResponse,
  UserAuthData,
  UserAuthRepository,
} from '../../interfaces/user.interfaces';

type AuthExec = {
  exec: (data: UserAuthData) => Promise<SignInResponse>;
};

export type AuthTestContext = {
  inMemoryUserAuth: UserAuthRepository;
  signUp: AuthExec;
  signIn: AuthExec;
};

export const it = test<AuthTestContext>;

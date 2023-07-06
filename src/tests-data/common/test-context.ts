import { test } from 'vitest';
import {
  UserAuthData,
  UserAuthRepository,
  UserAuthWithoutPassword,
} from '../../interfaces/auth.interfaces';

type AuthExec = {
  exec: (data: UserAuthData) => Promise<UserAuthWithoutPassword | string>;
};

export type AuthTestContext = {
  inMemoryUserAuth: UserAuthRepository;
  createUserAuth: AuthExec;
};

export const it = test<AuthTestContext>;

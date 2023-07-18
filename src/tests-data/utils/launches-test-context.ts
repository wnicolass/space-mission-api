import { test } from 'vitest';
import { LaunchRepository } from '../../interfaces/launches.interfaces';
import { UserAuthRepository } from '../../interfaces/user.interfaces';

export type LaunchTestContext = {
  launchesRepository: LaunchRepository;
  userRepository: UserAuthRepository;
};

export const it = test<LaunchTestContext>;

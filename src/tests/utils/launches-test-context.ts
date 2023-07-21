import { test } from 'vitest';
import { LaunchRepository } from '../../interfaces/launches.interfaces';
import { UserAuthRepository } from '../../interfaces/user.interfaces';
import { PlanetRepository } from '../../interfaces/planets.interfaces';

export type LaunchTestContext = {
  launchesRepository: LaunchRepository;
  userRepository: UserAuthRepository;
  planetRepository: PlanetRepository;
};

export const it = test<LaunchTestContext>;

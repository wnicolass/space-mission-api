import { UserAuthRepository } from '../../../interfaces/user.interfaces';
import {
  IncomingLaunch,
  LaunchRepository,
} from '../../../interfaces/launches.interfaces';
import { UserNotFoundError } from '../../../errors/auth.errors';
import {
  LaunchAlreadyExistsError,
  InvalidLaunchDateError,
} from '../../../errors/launch.errors';
import { isValidDate } from '../../helpers/check-date';
import { PlanetRepository } from '../../../interfaces/planets.interfaces';
import { PlanetNotFoundError } from '../../../errors/planet.errors';

export function saveLaunchFactory(
  launchRepository: LaunchRepository,
  userRepository: UserAuthRepository,
  planetRepository: PlanetRepository,
) {
  return {
    async exec(
      { mission, launchDate, planet, rocket }: IncomingLaunch,
      userId: string,
    ) {
      if (!isValidDate(launchDate)) {
        throw new InvalidLaunchDateError('Invalid launch date');
      }

      const launch = await launchRepository.getLaunchByMission(mission);
      if (launch) {
        throw new LaunchAlreadyExistsError(
          `Launch with mission name "${mission}" already exists`,
        );
      }

      const user = await userRepository.getUserById(userId);
      if (!user) {
        throw new UserNotFoundError('User not found');
      }

      const planets = (await planetRepository.getAll()).map(
        (planet) => planet.planetName,
      );
      if (!planets.includes(planet.planetName)) {
        throw new PlanetNotFoundError('Invalid planet');
      }

      const newLaunch = {
        mission,
        planet,
        launchDate,
        rocket,
      };
      await launchRepository.save(newLaunch, userId);
    },
  };
}

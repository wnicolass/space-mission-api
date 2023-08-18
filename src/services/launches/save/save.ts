import { UserAuthRepository } from '../../../interfaces/user.interfaces';
import {
  IncomingLaunch,
  LaunchRepository,
} from '../../../interfaces/launches.interfaces';
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
    async exec({
      mission,
      launchDate,
      planet,
      rocket,
      userId,
    }: IncomingLaunch) {
      if (!isValidDate(launchDate)) {
        throw new InvalidLaunchDateError('Invalid launch date');
      }

      const launch = await launchRepository.getLaunchByMission(mission);
      if (launch) {
        throw new LaunchAlreadyExistsError(
          `Launch with mission name "${mission}" already exists`,
        );
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
        userId,
      };
      await launchRepository.save(newLaunch);
    },
  };
}

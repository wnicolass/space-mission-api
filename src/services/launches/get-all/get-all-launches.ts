import { LaunchNotFoundError } from '../../../errors/launch.errors';
import { LaunchRepository } from '../../../interfaces/launches.interfaces';

export function getAllLaunchesFactory(launchesRepository: LaunchRepository) {
  return {
    async exec() {
      const launches = await launchesRepository.getAll();

      if (!launches.length) {
        throw new LaunchNotFoundError('No launches were found');
      }

      return launches;
    },
  };
}

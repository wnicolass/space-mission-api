import { LaunchNotFoundError } from '../../../errors/launch.errors';
import { LaunchRepository } from '../../../interfaces/launches.interfaces';

export function abortLaunchFactory(launchesRepository: LaunchRepository) {
  return {
    async exec(launchId: string) {
      const launch = await launchesRepository.getLaunchById(launchId);

      if (!launch) {
        throw new LaunchNotFoundError('No launches were found');
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return await launchesRepository.abort(launch.launchId!);
    },
  };
}

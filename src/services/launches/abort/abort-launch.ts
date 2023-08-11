import { ForbiddenError } from '../../../errors/auth.errors';
import { LaunchNotFoundError } from '../../../errors/launch.errors';
import { LaunchRepository } from '../../../interfaces/launches.interfaces';

export function abortLaunchFactory(launchesRepository: LaunchRepository) {
  return {
    async exec(launchId: string, userId: string) {
      const launch = await launchesRepository.getLaunchById(launchId);

      if (!launch) {
        throw new LaunchNotFoundError('Launch not found');
      }

      if (userId !== launch.createdBy) {
        throw new ForbiddenError(
          'Only the user who have created the launch can abort it',
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return await launchesRepository.abort(launch.launchId!, userId);
    },
  };
}

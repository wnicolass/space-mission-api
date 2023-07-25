import { UserAlreadyJoinedError } from '../../../errors/auth.errors';
import { LaunchNotFoundError } from '../../../errors/launch.errors';
import {
  JoinExpeditionInfo,
  UserLaunchRepository,
} from '../../../interfaces/launches.interfaces';

export function joinLaunchFactory(userLaunchRepository: UserLaunchRepository) {
  return {
    async exec({ launchId, userId }: JoinExpeditionInfo) {
      const expeditionFound =
        await userLaunchRepository.getExpeditionByLaunchId(launchId);
      if (!expeditionFound) {
        throw new LaunchNotFoundError(`Launch not found`);
      }

      const userAlreadyJoined =
        await userLaunchRepository.getExpeditionByLaunchAndUserId(
          launchId,
          userId,
        );
      if (userAlreadyJoined) {
        throw new UserAlreadyJoinedError('User already joined');
      }

      await userLaunchRepository.joinLaunch(
        launchId,
        userId,
        expeditionFound.launchDate,
      );
    },
  };
}

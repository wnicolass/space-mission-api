import { LaunchNotFoundError } from '../../../errors/launch.errors';
import {
  JoinExpeditionInfo,
  UserLaunchRepository,
} from '../../../interfaces/launches.interfaces';

export function joinLaunchFactory(userLaunchRepository: UserLaunchRepository) {
  return {
    exec({ launchId, userId }: JoinExpeditionInfo) {
      const expeditionFound =
        userLaunchRepository.getExpeditionByLaunchId(launchId);
      if (!expeditionFound) {
        throw new LaunchNotFoundError(`Launch not found`);
      }
    },
  };
}

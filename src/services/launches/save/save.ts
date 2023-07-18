import { UserAuthRepository } from '../../../interfaces/user.interfaces';
import {
  IncomingLaunch,
  LaunchRepository,
} from '../../../interfaces/launches.interfaces';
import { UserNotFoundError } from '../../../errors/auth.errors';

export function saveLaunchFactory(
  launchRepository: LaunchRepository,
  userRepository: UserAuthRepository,
) {
  return {
    async exec(
      { mission, launchDate, planet, rocket }: IncomingLaunch,
      userId: string,
    ) {
      const launch = await launchRepository.getLaunchByMission(mission);
      if (launch) {
        throw new Error(`Launch with mission name "${mission}" already exists`);
      }

      const user = await userRepository.getUserById(userId);
      if (!user) {
        throw new UserNotFoundError('User not found');
      }
    },
  };
}

import {
  IncomingLaunch,
  LaunchRepository,
} from '../../../interfaces/launches.interfaces';

export function saveLaunchFactory(launchRepository: LaunchRepository) {
  return {
    async exec({ mission, launchDate, planet, rocket }: IncomingLaunch) {
      throw new Error(`Mission name: ${mission} already exists`);
    },
  };
}

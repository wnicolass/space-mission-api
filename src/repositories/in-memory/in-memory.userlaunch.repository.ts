import { UserLaunchRepository } from '../../interfaces/launches.interfaces';

export function inMemoryUserLaunchRepository(): UserLaunchRepository {
  return {
    expeditions: [],
    getExpeditionByLaunchId(launchId) {
      return new Promise((res) => {
        res(
          this.expeditions?.find(
            (expedition) => expedition.launchId === launchId,
          ),
        );
      });
    },
  };
}

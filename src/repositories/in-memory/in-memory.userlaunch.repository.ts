import { UserLaunchRepository } from '../../interfaces/launches.interfaces';

export function inMemoryUserLaunchRepository(): UserLaunchRepository {
  return {
    expeditions: [],
    getExpeditionByLaunchId(launchId) {
      return new Promise((res) => {
        const expedition = this.expeditions?.find(
          (expedition) => expedition.launchId === launchId,
        );
        if (expedition) {
          return res(expedition);
        }
        return null;
      });
    },
    getExpeditionByLaunchAndUserId(launchId, userId) {
      return new Promise((res) => {
        const expedition = this.expeditions?.find(
          (expedition) =>
            expedition.launchId === launchId && expedition.userId === userId,
        );
        if (expedition) {
          return res(expedition);
        }
        return null;
      });
    },
  };
}

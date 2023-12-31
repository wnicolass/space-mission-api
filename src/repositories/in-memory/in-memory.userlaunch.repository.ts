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
        return res(null);
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
        return res(null);
      });
    },
    joinLaunch(launchId, userId) {
      return new Promise((res) => {
        const newUser = {
          launchId,
          userId,
          launchDate: new Date(Date.now()),
        };
        this.expeditions?.push(newUser);
        return res();
      });
    },
  };
}

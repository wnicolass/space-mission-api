import { LaunchRepository } from '../../interfaces/launches.interfaces';

export function inMemoryLaunchRepository(): LaunchRepository {
  return {
    launches: [],
    getAll() {
      return new Promise((res) => {
        if (this.launches) {
          return res(this.launches);
        }
      });
    },
    save(newLaunch) {
      return new Promise((res) => {
        this.launches?.push(newLaunch);
        return res();
      });
    },
    getLaunchByMission(mission) {
      return new Promise((res) => {
        res(this.launches?.find((launch) => launch.mission === mission));
      });
    },
  };
}

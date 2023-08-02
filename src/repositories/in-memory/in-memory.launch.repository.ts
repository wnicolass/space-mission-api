import {
  InDatabaseLaunch,
  LaunchRepository,
} from '../../interfaces/launches.interfaces';

export function inMemoryLaunchRepository(): LaunchRepository {
  return {
    launches: [],
    save(newLaunch) {
      return new Promise((res) => {
        this.launches?.push(newLaunch);
        return res();
      });
    },
    join(launchId, userId) {
      return new Promise((res) => {
        const launch = this.launches?.find(
          (launch: InDatabaseLaunch) => launch.launchId === launchId,
        ) as InDatabaseLaunch;
        launch.users = [];
        launch.users?.push(userId);
        return res();
      });
    },
    getAll() {
      return new Promise((res) => {
        if (this.launches) {
          return res(this.launches);
        }
      });
    },
    getLaunchById(launchId) {
      return new Promise((res) => {
        return res(
          this.launches?.find(
            (launch: InDatabaseLaunch) => launch.launchId === launchId,
          ),
        );
      });
    },
    getLaunchByMission(mission) {
      return new Promise((res) => {
        return res(this.launches?.find((launch) => launch.mission === mission));
      });
    },
    abort(launchId) {
      return new Promise((res) => {
        this.launches?.forEach((launch: InDatabaseLaunch, i) => {
          if (launch.launchId === launchId) {
            this.launches?.splice(i, 1);
            return res();
          }
        });
      });
    },
  };
}

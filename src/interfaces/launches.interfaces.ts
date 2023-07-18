import { Planet } from './planets.interfaces';

export type IncomingLaunch = {
  mission: string;
  rocket: string;
  launchDate: string;
  planet: Planet;
};

export type InDatabaseLaunch = IncomingLaunch & {
  launchId?: string;
};

export type LaunchRepository = {
  launches?: (InDatabaseLaunch | IncomingLaunch)[];
  getAll: () => Promise<(InDatabaseLaunch | IncomingLaunch)[]>;
  save: (newLaunch: IncomingLaunch) => Promise<void>;
  getLaunchByMission: (mission: string) => Promise<InDatabaseLaunch | void>;
};

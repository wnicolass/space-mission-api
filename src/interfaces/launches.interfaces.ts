import { Planet } from './planets.interfaces';

export type IncomingLaunch = {
  mission: string;
  rocket: string;
  launchDate: string;
  planet: Planet;
};

export type InDatabaseLaunch = IncomingLaunch & {
  launchId: string;
};

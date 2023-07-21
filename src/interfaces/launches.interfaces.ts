import { Launch } from '@prisma/client';
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
  getAll: () =>
    | Promise<(InDatabaseLaunch | IncomingLaunch)[]>
    | Promise<Launch[]>;
  save: (newLaunch: IncomingLaunch, userId: string) => Promise<void>;
  getLaunchByMission: (
    mission: string,
  ) => Promise<InDatabaseLaunch | void> | Promise<Launch | null>;
};

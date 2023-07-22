import { Launch } from '@prisma/client';
import { Planet } from './planets.interfaces';

export type IncomingLaunch = {
  mission: string;
  rocket: string;
  launchDate: string;
  planet: Planet;
  userId: string;
};

export type InDatabaseLaunch = IncomingLaunch & {
  launchId?: string;
  users?: string[];
};

export type LaunchRepository = {
  launches?: (InDatabaseLaunch | IncomingLaunch)[];
  getAll: () => Promise<(IncomingLaunch | InDatabaseLaunch)[] | Launch[]>;
  save: (newLaunch: IncomingLaunch) => Promise<void>;
  getLaunchByMission: (
    mission: string,
  ) => Promise<InDatabaseLaunch | void | Launch | null>;
  join: (launchId: string, userId: string) => Promise<void>;
};

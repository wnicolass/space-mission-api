import { Launch, UserLaunch } from '@prisma/client';
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

export type UserLaunchRepository = {
  expeditions?: UserLaunch[];
  getExpeditionByLaunchId: (launchId: string) => Promise<UserLaunch | null>;
  getExpeditionByLaunchAndUserId: (
    launchId: string,
    userId: string,
  ) => Promise<UserLaunch | null>;
  joinLaunch: (
    launchId: string,
    userId: string,
    launchDate: Date,
  ) => Promise<void>;
};

export type JoinExpeditionInfo = {
  launchId: string;
  userId: string;
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

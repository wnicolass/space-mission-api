import { Launch, UserLaunch, UserProfile } from '@prisma/client';
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
  createdBy?: string;
};

export type JoinExpeditionInfo = {
  launchId: string;
  userId: string;
};

export type LaunchResponse = {
  mission: string;
  rocket: string;
  users: Pick<UserProfile, 'username'>[];
  planet: Planet;
};

export type LaunchInfo = {
  launchDate: string;
  launch: LaunchResponse;
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

export type LaunchRepository = {
  launches?: (InDatabaseLaunch | IncomingLaunch)[];
  save: (newLaunch: IncomingLaunch) => Promise<void | Launch>;
  join: (launchId: string, userId: string) => Promise<void>;
  getAll: () => Promise<(IncomingLaunch | InDatabaseLaunch)[] | any[]>;
  getLaunchById: (
    launchId: string,
  ) => Promise<InDatabaseLaunch | void | Launch | null>;
  getLaunchByMission: (
    mission: string,
  ) => Promise<InDatabaseLaunch | void | Launch | null>;
  abort: (launchId: string, userId: string) => Promise<void>;
};

import {
  LaunchInfo,
  LaunchRepository,
} from '../../interfaces/launches.interfaces';
import { UserLaunch } from '@prisma/client';
import prisma from '../../../prisma/client-singleton';

export default function launchRepositoryFactory(): LaunchRepository {
  return {
    async getAll() {
      return (await prisma.userLaunch.findMany({
        select: {
          launchDate: true,
          launch: {
            select: {
              mission: true,
              rocket: true,
              users: {
                select: {
                  user: {
                    select: {
                      userId: true,
                      username: true,
                    },
                  },
                },
              },
              planet: {
                select: {
                  planetName: true,
                },
              },
            },
          },
        },
      })) as unknown as LaunchInfo[];
    },
    async getLaunchByMission(mission) {
      return await prisma.launch.findFirst({
        where: {
          mission,
        },
      });
    },
    async save(newLaunch) {
      return await prisma.launch.create({
        data: {
          mission: newLaunch.mission,
          rocket: newLaunch.rocket,
          planet: {
            connect: {
              planetName: newLaunch.planet.planetName,
            },
          },
          users: {
            create: {
              user: {
                connect: {
                  userId: newLaunch.userId,
                },
              },
              launchDate: new Date(newLaunch.launchDate),
            },
          },
        },
      });
    },
    async join(launchId, userId) {
      const launch = (await prisma.userLaunch.findFirst({
        where: {
          launchId,
        },
      })) as UserLaunch;
      await prisma.userLaunch.create({
        data: {
          userId,
          launchId,
          launchDate: new Date(launch.launchDate),
        },
      });
    },
    async abort(launchId) {
      await prisma.launch.delete({
        where: {
          launchId,
        },
      });
      return;
    },
  };
}

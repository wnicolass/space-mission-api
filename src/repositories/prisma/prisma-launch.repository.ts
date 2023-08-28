import { UserLaunch } from '@prisma/client';
import { LaunchRepository } from '../../interfaces/launches.interfaces';
import prisma from '../../../prisma/client-singleton';

export default function launchRepositoryFactory(): LaunchRepository {
  return {
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
          user: {
            connect: {
              userId: newLaunch.userId,
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
    async getAll() {
      return (
        await prisma.userLaunch.findMany({
          distinct: ['launchId'],
          select: {
            launchDate: true,
            launch: {
              select: {
                launchId: true,
                mission: true,
                rocket: true,
                users: {
                  select: {
                    user: true,
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
        })
      ).map((launch) => {
        return {
          launchDate: launch.launchDate,
          launch: {
            launchId: launch.launch.launchId,
            mission: launch.launch.mission,
            rocket: launch.launch.rocket,
            planet: launch.launch.planet,
            users: launch.launch.users.map((user) => {
              return {
                username: user.user.username,
              };
            }),
          },
        };
      });
    },
    async getLaunchById(launchId) {
      return await prisma.launch.findFirst({
        where: {
          launchId,
        },
      });
    },
    async getLaunchByMission(mission) {
      return await prisma.launch.findFirst({
        where: {
          mission,
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

import { LaunchRepository } from '../../interfaces/launches.interfaces';
import { PrismaClient, UserLaunch } from '@prisma/client';

export default function launchRepositoryFactory(): LaunchRepository {
  const prisma = new PrismaClient();
  return {
    async getAll() {
      return await prisma.launch.findMany();
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
  };
}

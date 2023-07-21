import { LaunchRepository } from '../../interfaces/launches.interfaces';
import { PrismaClient } from '@prisma/client';

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
    async save(newLaunch, userId) {
      await prisma.launch.create({
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
                  userId: userId,
                },
              },
              launchDate: newLaunch.launchDate,
            },
          },
        },
      });
    },
  };
}

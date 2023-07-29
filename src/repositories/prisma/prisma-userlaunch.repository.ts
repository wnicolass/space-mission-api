import prisma from '../../../prisma/client-singleton';
import { UserLaunchRepository } from '../../interfaces/launches.interfaces';

export default function userLaunchRepositoryFactory(): UserLaunchRepository {
  return {
    async getExpeditionByLaunchId(launchId) {
      return prisma.userLaunch.findFirst({
        where: {
          launchId,
        },
      });
    },
    async getExpeditionByLaunchAndUserId(launchId, userId) {
      return prisma.userLaunch.findFirst({
        where: {
          launchId,
          userId,
        },
      });
    },
    async joinLaunch(launchId, userId, launchDate) {
      await prisma.userLaunch.create({
        data: {
          userId,
          launchId,
          launchDate,
        },
      });
    },
  };
}

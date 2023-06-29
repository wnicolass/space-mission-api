import { PrismaClient } from '@prisma/client';
import type { UserAuthRepository } from '../auth.repository';

export default function UserAuthRepositoryFactory(): UserAuthRepository {
  const prisma = new PrismaClient();
  return {
    async signup({ username, email, password }) {
      const userAuth = await prisma.userAuthData.create({
        data: {
          email,
          hashedPassword: password,
        },
      });
      await prisma.userProfile.create({
        data: {
          userId: userAuth.userId,
          username,
        },
      });
    },
    async getUserByEmail(email) {
      const user = await prisma.userAuthData.findUnique({
        where: {
          email,
        },
      });
      return !!user;
    },
  };
}

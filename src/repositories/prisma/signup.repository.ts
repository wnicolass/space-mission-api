import { PrismaClient } from '@prisma/client';
import type { UserAuthRepository } from '../auth.repository';

export default function SignUpRepositoryFactory(): UserAuthRepository {
  return {
    async signup({ username, email, password }) {
      const prisma = new PrismaClient();
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
  };
}

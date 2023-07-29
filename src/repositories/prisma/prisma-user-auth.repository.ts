import prisma from '../../../prisma/client-singleton';
import type {
  InDatabaseUser,
  UserAuthRepository,
} from '../../interfaces/user.interfaces';

export default function userAuthRepositoryFactory(): UserAuthRepository {
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
      const user = (await prisma.userAuthData.findUnique({
        where: {
          email,
        },
      })) as InDatabaseUser;
      return user;
    },
    async getUserById(userId) {
      const user = await prisma.userAuthData.findUnique({
        where: {
          userId,
        },
      });
      if (user) {
        return user;
      }
      return;
    },
  };
}

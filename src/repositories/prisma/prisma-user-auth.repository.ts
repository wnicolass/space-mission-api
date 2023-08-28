import prisma from '../../../prisma/client-singleton';
import type {
  InDatabaseUser,
  UserAuthRepository,
  UserProfile,
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
        select: {
          userId: true,
          userProfileData: {
            select: {
              username: true,
              launches: true,
              profileImageUrl: true,
            },
          },
        },
      });
      if (user) {
        return user;
      }
      return;
    },
    async updateProfile(userId, newData) {
      return (await prisma.userProfile.update({
        data: {
          username: newData.username,
          profileImageUrl: newData.profileImageUrl,
        },
        where: {
          userId,
        },
        select: {
          username: true,
          profileImageUrl: true,
        },
      })) as UserProfile;
    },
  };
}

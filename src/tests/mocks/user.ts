import prisma from '../../../prisma/client-singleton';
import { randomUUID } from 'node:crypto';
import hashPassword from '../../services/security/hash/hash-password';

export function createUserMock(
  username: string,
  email: string,
  password?: string,
  hashedPassword?: string,
  userId: string = randomUUID(),
) {
  return {
    userId,
    username,
    email,
    password,
    hashedPassword,
  };
}

export async function createDbUserMock(
  email: string,
  password: string,
  username: string,
) {
  const { hashedPassword } = await hashPassword(password);
  return await prisma.userAuthData.create({
    data: {
      email,
      hashedPassword,
      userProfileData: {
        create: {
          username,
        },
      },
    },
  });
}

export const user = {
  username: 'Some name',
  email: 'jared@gmail.com',
  password: 'some password',
};

export const validUser = {
  username: 'John Doe',
  email: 'jansen@gmail.com',
  password: 'John1#',
};

export const userWithEmptyField = {
  username: 'John Doe',
  email: 'johndoe',
  password: '',
};

export const userWithInvalidEmail = {
  username: 'John Doe',
  email: 'johndoe',
  password: 'John1#',
};

export const userWithId = {
  id: '12scfsdafsdfhuh1',
  username: 'John Doe',
  email: 'jansen@gmail.com',
  password: 'John1#',
};

export const inDbUser = {
  userId: '12scfsdafsdfhuh1',
  username: 'John Doe',
  email: 'jansen@gmail.com',
  hashedPassword: 'fdsfdsfsdfs',
};

export const inDbUserWithProfileImage = {
  userId: 'anyId',
  username: 'John Doe',
  email: 'jansen@gmail.com',
  profileImageUrl: 'https://someuri.com',
  launches: [],
};

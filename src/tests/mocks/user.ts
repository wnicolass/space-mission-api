import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

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

export async function createDbUserMock(email: string, hashedPassword: string) {
  const prisma = new PrismaClient();
  return await prisma.userAuthData.create({
    data: {
      email,
      hashedPassword,
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

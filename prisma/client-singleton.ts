import { PrismaClient } from '@prisma/client';

export const getPrismaClient = (function () {
  const prisma = new PrismaClient();

  return {
    prisma,
  };
})();

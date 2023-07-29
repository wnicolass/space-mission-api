import { PrismaClient } from '@prisma/client';

export default (function getPrismaClient() {
  const prisma = new PrismaClient();

  return (() => prisma)();
})();

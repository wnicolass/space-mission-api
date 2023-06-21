import { PrismaClient } from '@prisma/client';
import getHabitablePlanets from '../data/planet.handler';
const prisma = new PrismaClient();

async function main(): Promise<void> {
  const planets: string[] = await getHabitablePlanets();
  for (const planet of planets) {
    await prisma.planet.upsert({
      where: {
        planetName: planet,
      },
      update: {
        planetName: planet,
      },
      create: {
        planetName: planet,
      },
    });
  }
}

(async function execMain(): Promise<void> {
  try {
    await main();
    await prisma.$disconnect();
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
  }
})();

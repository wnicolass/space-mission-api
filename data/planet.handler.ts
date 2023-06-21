import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { parse, Parser } from 'csv-parse';

type ParserOptions = {
  comment: string;
  columns: boolean;
};

type Planet = {
  kepler_name: string;
  koi_disposition: string;
  koi_insol: number;
  koi_prad: number;
};

function isHabitablePlanet(planet: Planet): boolean {
  return (
    planet.koi_disposition === 'CONFIRMED' &&
    planet.koi_insol > 0.36 &&
    planet.koi_insol < 1.11 &&
    planet.koi_prad < 1.6
  );
}

async function getHabitablePlanets(): Promise<string[]> {
  const habitablePlanets: string[] = [];
  const filePath: string = join(__dirname, 'kepler-data.csv');
  const parserOptions: ParserOptions = { comment: '#', columns: true };
  const parsedPlanetDataStream: Parser = createReadStream(filePath).pipe(
    parse(parserOptions),
  );

  for await (const planet of parsedPlanetDataStream) {
    if (isHabitablePlanet(planet)) {
      habitablePlanets.push(planet.kepler_name);
    }
  }

  return habitablePlanets;
}

export default getHabitablePlanets;

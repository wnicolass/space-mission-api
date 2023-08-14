export type Planet = {
  planetId?: string;
  planetName: string;
};

export type PlanetRepository = {
  planets?: Planet[];
  getAll(): Promise<Planet[]>;
  getPlanetById(planetId: string): Promise<Planet | null>;
};

export type Planet = {
  planetName: string;
};

export type PlanetRepository = {
  planets?: Planet[];
  getAll(): Promise<Planet[]>;
};

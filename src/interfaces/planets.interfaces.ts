export type Planet = {
  planetName: string;
};

export type PlanetRepository = {
  getAll(): Planet[];
};

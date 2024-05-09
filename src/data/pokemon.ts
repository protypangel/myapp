import { Pokemon, PokemonType, PokemonStat } from '../model/Pokemon';

export const POKEMONS: Pokemon[] = [
  new Pokemon(
    1,
    'Bulbasaur',
    [PokemonType.GRASS, PokemonType.POISSON],
    new PokemonStat(
      [200, 294, 45],
      [92, 216, 49],
      [92, 216, 49],
      [121, 251, 65],
      [121, 251, 65],
      [85, 207, 45]
    )
  ),
  new Pokemon(
    2,
    'Ivysaur',
    [PokemonType.GRASS, PokemonType.POISSON],
    new PokemonStat(
      [230, 324, 60],
      [116, 245, 62],
      [117, 247, 63],
      [148, 284, 80],
      [148, 284, 80],
      [112, 240, 60]
    )
  ),
  new Pokemon(
    3,
    'Venusaur',
    [PokemonType.GRASS, PokemonType.POISSON],
    new PokemonStat(
      [270, 364, 80],
      [152, 289, 83],
      [153, 291, 83],
      [184, 328, 100],
      [328, 184, 100],
      [148, 284, 80]
    )
  ),
];

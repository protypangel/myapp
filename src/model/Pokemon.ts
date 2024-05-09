export class Pokemon {
  key: Number;
  name: String;
  image: PokemonImage;
  type: Array<string>;
  stat: PokemonStat;

  constructor(
    key: Number,
    name: string,
    image: PokemonImage,
    type: string[],
    stat: PokemonStat
  ) {
    this.key = key;
    this.name = name;
    this.image = image;
    this.type = type;
    this.stat = stat;
  }
}
export class PokemonImage {
  dream_world: string;
  artwork: {
    default: string;
    shiny: string;
  };
  animated: {
    front: {
      default: string;
      shiny: string;
    };
    back: {
      default: string;
      shiny: string;
    };
  };
  constructor() {
    this.artwork = {
      default: '',
      shiny: '',
    };
    this.animated = {
      front: {
        default: '',
        shiny: '',
      },
      back: {
        default: '',
        shiny: '',
      },
    };
  }
  public static OfPokeApi(result: any): PokemonImage {
    try {
      let image = new PokemonImage();
      image.dream_world = result.dream_world.front_default;
      image.artwork.default = result['official-artwork'].front_default;
      image.artwork.shiny = result['official-artwork'].front_shiny;
      image.animated.front.default = result.showdown.front_default;
      image.animated.front.shiny = result.showdown.front_shiny;
      image.animated.back.default = result.showdown.back_default;
      image.animated.back.shiny = result.showdown.back_shiny;
      return image;
    } catch (error) {
      console.log('=================');
      console.log(result);
      console.log(error);
      return null;
    }
  }
}
class MinMax {
  min: Number;
  max: Number;
  base: Number;

  constructor(min: Number, max: Number, base: Number) {
    this.min = min;
    this.max = max;
    this.base = base;
  }
}
export class PokemonStat {
  hp: MinMax;
  attack: MinMax;
  defense: MinMax;
  spAtk: MinMax;
  spDef: MinMax;
  speed: MinMax;
  total: MinMax;
  constructor(
    hp: [max: number, min: number, base: number],
    attack: [max: number, min: number, base: number],
    defense: [max: number, min: number, base: number],
    spAtk: [max: number, min: number, base: number],
    spDef: [max: number, min: number, base: number],
    speed: [max: number, min: number, base: number]
  ) {
    this.hp = this.TupleToMinMax(hp);
    this.attack = this.TupleToMinMax(attack);
    this.defense = this.TupleToMinMax(defense);
    this.spAtk = this.TupleToMinMax(spAtk);
    this.spDef = this.TupleToMinMax(spDef);
    this.speed = this.TupleToMinMax(speed);
    this.total = this.TupleToMinMax([
      hp[0] + attack[0] + defense[0] + spAtk[0] + spDef[0] + speed[0],
      hp[1] + attack[1] + defense[1] + spAtk[1] + spDef[1] + speed[1],
      hp[2] + attack[2] + defense[2] + spAtk[2] + spDef[2] + speed[2],
    ]);
  }
  private TupleToMinMax(tuple: [number, number, number]): MinMax {
    return new MinMax(tuple[0], tuple[1], tuple[2]);
  }
  public static OfPokeApi(stats: any): PokemonStat {
    return new PokemonStat(
      PokemonStat.StateCalcul(stats[0]),
      PokemonStat.StateCalcul(stats[1]),
      PokemonStat.StateCalcul(stats[2]),
      PokemonStat.StateCalcul(stats[3]),
      PokemonStat.StateCalcul(stats[4]),
      PokemonStat.StateCalcul(stats[5])
    );
  }
  private static StateCalcul(value: number): [number, number, number] {
    return [value, 2 * value + 110, 2 * value + 204];
  }
}

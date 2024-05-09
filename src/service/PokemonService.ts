import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonImage, PokemonStat } from '../model/Pokemon';
import { Subscription } from '../model/Subscription';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonsSubscription: Subscription<Pokemon> = new Subscription();
  constructor(private http: HttpClient) {
    this.http
      .get('https://pokeapi.co/api/v2/pokemon?limit=-1')
      .subscribe(async (response: any) => {
        response.results.forEach((result) => this.getPokemon(result.url));
      });
  }
  private getPokemon(url: string): void {
    const promise: Promise<Pokemon> = new Promise((resolve, reject) => {
      this.http.get(url).subscribe({
        next: (json: any) => {
          const pokemon: Pokemon = new Pokemon(
            json.order,
            json.name,
            PokemonImage.OfPokeApi(json.sprites.other),
            json.types.map((type) => type.type.name),
            PokemonStat.OfPokeApi(json.stats)
          );
          resolve(pokemon);
        },
      });
    });
    promise.then((value) => (this.pokemonsSubscription.value = value));
  }
}

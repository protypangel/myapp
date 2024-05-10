import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pokemon, PokemonImage, PokemonStat } from '../model/Pokemon';
import { Observable, map } from 'rxjs';

export interface PokemonServiceData {
  observers: Observable<Pokemon>[];
  size: number;
}
@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonsObserver: Observable<PokemonServiceData>;
  constructor(private http: HttpClient) {
    this.pokemonsObserver = this.http
      .get('https://pokeapi.co/api/v2/pokemon?limit=-1')
      .pipe(
        map((response: any) => {
          const data: PokemonServiceData = {
            observers: response.results
              // .filter((x, index) => index <= 10)
              .map((result: any) => this.getPokemon(result.url)),
            size: response.count,
          };
          return data;
        })
      );
  }
  private getPokemon(url: string): Observable<Pokemon> {
    return this.http.get<any>(url).pipe(
      map((json: any) => {
        const pokemon: Pokemon = new Pokemon(
          json.order,
          json.name,
          PokemonImage.OfPokeApi(json.sprites.other),
          json.types.map((type) => type.type.name),
          PokemonStat.OfPokeApi(json.stats)
        );
        return pokemon;
      })
    );
  }
}

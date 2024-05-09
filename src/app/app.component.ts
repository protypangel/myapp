import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../service/PokemonService';
import { Pokemon } from '../model/Pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'myapp';
  pokemons: Pokemon[] = [];
  constructor(private service: PokemonService) {}
  ngOnInit(): void {
    this.service.pokemonsSubscription.subscribe((latest, alls) => {
      // console.log('1-', latest.name);
      if (this.pokemons.length > 1) return;
      this.pokemons.push(latest);
    });
  }
}

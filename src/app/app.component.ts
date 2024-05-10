import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  constructor(
    private service: PokemonService,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    for (let index = 0; index <= 10; index++) {
      setTimeout(() => {
        console.log('here');
        this.pokemons.push(new Pokemon(-1, `${index}`, null, null, null));
      }, 1000 * index);
    }
    // this.service.pokemonsObserver.subscribe((data) => {
    //   data.observers.forEach((observer) =>
    //     observer.subscribe((pokemon) => {
    //       this.pokemons.push(pokemon);
    //       this.changeDetector.detectChanges();
    //       // console.log(pokemon.name);
    //     })
    //   );
    // });
  }
}

import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Pokemon } from '../../model/Pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss',
})
export class PokemonComponent implements OnChanges {
  @Input() pokemon: Pokemon;
  constructor(private changeDetector: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetector.detectChanges();
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';



@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: [],

})
export class DetailPokemonComponent {
  pokemonList: Pokemon[] ;
  pokemon: Pokemon | undefined

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
      .subscribe(pokemon => this.pokemon = pokemon)
    }
  }

  deletePokemon(pokemon: Pokemon)  {
    this.pokemonService.deletePokemonById(pokemon.id)
    .subscribe(() => this.goBack())
  }

  goBack() {
    this.router.navigate(['/pokemons'])
  }

  editPokemon(pokemon: Pokemon) {
    this.router.navigate(['/edit/pokemon', pokemon.id])
  }
}

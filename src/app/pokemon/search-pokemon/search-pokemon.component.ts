import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';


@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css']
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>();
  // {...pokemonList(a) ...pokemonList(b)...}
  pokemons$: Observable<Pokemon[]>;


  constructor(
    private router: Router,
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.pokemons$ = this.searchTerms.pipe(
      //{..."a"."ab"..."abz".."ab"...."abc"......."les points correspondent au temps de frappe de l'utilisateur"}
      debounceTime(300),
      //{......."ab"...."ab"...."abc"......."les points correspondent au temps de frappe de l'utilisateur"}
      distinctUntilChanged(),
      //{......."ab"........"abc"......."les points correspondent au temps de frappe de l'utilisateur"}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      //{..............."pokemonList(ab)"......."les points correspondent au temps de frappe de l'utilisateur"}
      // concatMap / mergeMap / switchMap
     )
  }

  search(term: string) {
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link = ['/pokemon', pokemon.id];
    this.router.navigate(link);
  }
}

import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable()
export class PokemonService {

  constructor(private http: HttpClient){}

  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((res) => this.log(res)),
      catchError(catchError((error) => this.handleError(error, [])))
    );
   }

  getPokemonById(pokemonId: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${pokemonId}`).pipe(
      tap((res) => this.log(res)),
      catchError((error) => this.handleError(error, undefined))
    );
  }
  searchPokemonList(term: string): Observable<Pokemon[]>  {
    if (term.length <= 1) {
      return of([]);
    } else {
      return this.http.get<Pokemon[]>(`api/pokemons/?name=${term}`).pipe(
        tap((res) => this.log(res)),
        catchError((error) => this.handleError(error, []))
      )
    }
  }


  upDatePokemon(pokemon: Pokemon): Observable<null> {
    this.option()
      return this.http.put('api/pokemons', pokemon, this.option()).pipe(
        tap((res) => this.log(res)),
        catchError((error) => this.handleError(error, null))
      )
  }

  deletePokemonById(pokemonId: number): Observable<null>{
    return this.http.delete(`api/pokemons/${pokemonId}`).pipe(
      tap((res) => this.log(res)),
      catchError((error) => this.handleError(error, null))
    )
  }

  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    this.option()
    return this.http.post<Pokemon>('api/pokemons', pokemon, this.option()).pipe(
      tap((res) => this.log(res)),
      catchError((error) => this.handleError(error, null))
    )
  }

  private log(res: any) {
    console.table(res);
  }

  private handleError(error: Error, errorValue: any ) {
    console.error(error);
    return of(errorValue);
  }

  private option(): any {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return httpOptions;
  }

  getPokemonTypeList(): string[] {
    return [
      'Feu',
      'Plante',
      'Fer',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy']
  }
}

import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrls: []
})
export class AddPokemonComponent implements OnInit  {
  pokemon: Pokemon;

  ngOnInit(){
    this.pokemon = new Pokemon();
  }
}

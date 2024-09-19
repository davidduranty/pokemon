import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonTypesColorPipePipe } from './pokemon-types-color-pipe.pipe';
import { BorderCardDirective } from './border-card.directive';
import { ListePokemonComponent } from './liste-pokemon/liste-pokemon.component';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { RouterModule, Routes } from '@angular/router';
import { PokemonService } from './pokemon.service';
import { FormsModule } from '@angular/forms';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { AddPokemonComponent } from './add-pokemon/add-pokemon.component';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';
import { LoaderComponent } from './loader/loader.component';
import { authGuard } from '../auth.guard';

const pokemonRoutes: Routes = [
  { path: 'edit/pokemon/:id', component: EditPokemonComponent, canActivate: [authGuard] },
  { path: 'pokemon/add', component: AddPokemonComponent, canActivate: [authGuard]},
  { path: 'pokemons', component: ListePokemonComponent, canActivate: [authGuard]},
  { path: 'pokemon/:id', component: DetailPokemonComponent, canActivate: [authGuard] }
];

@NgModule({
  declarations: [
    ListePokemonComponent,
    DetailPokemonComponent,
    PokemonTypesColorPipePipe,
    BorderCardDirective,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    SearchPokemonComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(pokemonRoutes),
  ],
  providers: [PokemonService]
})
export class PokemonModule { }

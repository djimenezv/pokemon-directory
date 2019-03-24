import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { configUrl } from '../../assets/configUrl';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon, PokemonList } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private httpClient: HttpClient) { }

  getPokemons(offset: number): Observable<any> {
    return this.httpClient.get(`${configUrl.pokemonBaseUrl}pokemon-species?offset=${offset}&limit=20`)
      .pipe(
        map((pokemonList: PokemonList) => this.addAdditionalPropertiesToEntity(pokemonList))
      );
  }

  getPokemonById(pokemonId: number): Observable<any> {
    return this.httpClient.get(`${configUrl.pokemonBaseUrl}pokemon/${pokemonId}/`);
  }

  // transformation methods
  private addAdditionalPropertiesToEntity(pokemonList: PokemonList): PokemonList {
    return {
      ...pokemonList,
      results: this.transformPokemonEntityResults(pokemonList.results)
    };
  }

  private transformPokemonEntityResults(pokemons: Pokemon[]): Pokemon[] {
    return pokemons.map(pokemon => ({
      ...pokemon,
      spriteUrl: this.getPokemonSpriteUrl(pokemon.url),
      id: this.getPokemonId(pokemon.url)
    }));
  }

  private getPokemonId(pokemonUrl: string) {
    const urlWithoutLastSlash = pokemonUrl.slice(0, -1);
    return Number.parseInt(urlWithoutLastSlash.substr(urlWithoutLastSlash.lastIndexOf('/') + 1, urlWithoutLastSlash.length - 1), 10);
  }

  private getPokemonSpriteUrl(pokemonUrl: string) {
    return `${configUrl.spritePokemonUrl}${this.getPokemonId(pokemonUrl)}.png`;
  }

}

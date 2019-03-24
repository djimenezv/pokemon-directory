import { defer } from 'rxjs';

export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

export const pokemonServiceResponses = {
  GET_POKEMONS: {
    results: [{
                name: "zubat",
                url: "https://pokeapi.co/api/v2/pokemon-species/1/"
              },
              {
                name: "pikachu",
                url: "https://pokeapi.co/api/v2/pokemon-species/2/"
              }]
  },
  GET_POKEMONS_FORMATED: {
              results: [{
                name: "zubat",
                url: "https://pokeapi.co/api/v2/pokemon-species/1/",
                spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
                id: 1
              },
              {
                name: "pikachu",
                url: "https://pokeapi.co/api/v2/pokemon-species/2/",
                spriteUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
                id: 2
              }]
  }
}

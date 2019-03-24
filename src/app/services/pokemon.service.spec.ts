import { TestBed, getTestBed,  } from '@angular/core/testing';
import { PokemonService } from './pokemon.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { pokemonServiceResponses, asyncData } from '../helpers/testingHelpers';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    pokemonService = new PokemonService(<any> httpClientSpy);

    TestBed.configureTestingModule({})
  });

  fit('should be created', () => {
    expect(pokemonService).toBeTruthy();
  });

  fit('should add sprite url and id properties to pokemon entities', ()=>{
    httpClientSpy.get.and.returnValue(asyncData(pokemonServiceResponses.GET_POKEMONS));
    pokemonService.getPokemons(0)
      .subscribe(pokemons => {
        expect(pokemons).toEqual(pokemonServiceResponses.GET_POKEMONS_FORMATED, 'formated pokemons');
      });
  });

});

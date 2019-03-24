import { createSelector } from '@ngrx/store';
import * as fromRoot from '../../reducers';

export const allPokemonsAlreadyFetchedValidators = createSelector(
  (state: fromRoot.State) => state.pokemonsContainer.currentOffset,
  rootState => rootState.pokemonsContainer.pokemonList.count,
  (currentOffset, TotalPokemons) => currentOffset >= TotalPokemons);


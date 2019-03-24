import * as fromMasterDetailReducers from './index';
import * as fromMasterDetailActions from '../actions/master-detail.actions';
import { Action } from '@ngrx/store';
import { pokemonServiceResponses } from '../../helpers/testingHelpers';
import { PokemonList } from 'src/app/models/pokemon';

describe('Master Detail reducers', () => {
  fit('should return the default state when state is not definied', () => {
    const { initialState } = fromMasterDetailReducers;
    const action = {} as Action;
    const state = fromMasterDetailReducers.reducer(undefined, action);
    expect(state).toBe(initialState);
  });

  fit('should turn on master loading flag on load action', () => {
    const { initialState } = fromMasterDetailReducers;
    const action = new fromMasterDetailActions.StartLoadMasterDetails();
    const state = fromMasterDetailReducers.reducer(initialState, action);
    expect(state.processingMaster).toBe(true);
  });
 /*
  fit('should increment currentOffset after fetch pokemons', () => {
    const { initialState } = fromMasterDetailReducers;
    const action = new fromMasterDetailActions.EndLoadMasterDetails(pokemonServiceResponses.GET_POKEMONS as PokemonList);
    const state = fromMasterDetailReducers.reducer(initialState, action);
    expect(state.processingMaster).toBe(true);
  });
*/
});

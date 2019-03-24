import { Action } from '@ngrx/store';
import * as masterDetailActions from '../actions/master-detail.actions';
import { PokemonList, Pokemon } from '../../models/pokemon';

export interface State {
  pokemonList: PokemonList;
  processingMaster: boolean;
  processingDetail: boolean;
  currentOffset: number;
  selectedPokemonId: number;
  selectedPokemonData: Pokemon;
}

export const initialState: State = {
  pokemonList: {} as PokemonList,
  processingMaster: false,
  processingDetail: false,
  currentOffset: 0,
  selectedPokemonId: 0,
  selectedPokemonData: null
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case masterDetailActions.MasterDetailActionTypes.StartLoadMasterDetails :
      return {
        ...state,
        processingMaster: true
      };
    case masterDetailActions.MasterDetailActionTypes.EndLoadMasterDetails :
      return {
        ...state,
        processingMaster: false,
        pokemonList: (action as masterDetailActions.EndLoadMasterDetails).payLoad,
        currentOffset: state.currentOffset + 20
      };
    case masterDetailActions.MasterDetailActionTypes.StartAppendMasterDetails :
      return {
        ...state,
        processingMaster: true,
      };
    case masterDetailActions.MasterDetailActionTypes.EndAppendMasterDetails :
      const queryResult = (action as masterDetailActions.EndAppendMasterDetails);
      return {
        ...state,
        processingMaster: false,
        currentOffset: state.currentOffset + 20,
        pokemonList: {
          count: queryResult.payLoad.count,
          next: queryResult.payLoad.next,
          results: state.pokemonList.results.concat(queryResult.payLoad.results),
        }
      };
    case masterDetailActions.MasterDetailActionTypes.StartGetDetail :
        const selectedPokemonId = (action as masterDetailActions.StartGetDetail).payLoad;
        return {
          ...state,
          processingDetail: true,
          selectedPokemonId: selectedPokemonId
        };
    case masterDetailActions.MasterDetailActionTypes.EndGetDetail :
        debugger;
        const queryResultDetail = (action as masterDetailActions.EndGetDetail);
        return {
          ...state,
          processingDetail: false,
          selectedPokemonData: queryResultDetail.payLoad
        };

    default:
      return state;
  }
}
//export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

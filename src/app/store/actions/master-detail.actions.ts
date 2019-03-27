import { Action } from '@ngrx/store';
import { PokemonList, Pokemon } from '../../models/pokemon';

export enum MasterDetailActionTypes {
  StartLoadMasterDetails = '[MasterDetail] Starting Load MasterDetails',
  EndLoadMasterDetails = '[MasterDetail] Ending Load MasterDetails',
  StartAppendMasterDetails = '[MasterDetail] Starting Adding More Pokemons to master list',
  EndAppendMasterDetails = '[MasterDetail] Ending Adding More Pokemons to master list',
  StartGetDetail = '[MasterDetail] Starting action to get pokemon detail',
  EndGetDetail = '[MasterDetail] Ending action to get pokemon detail',
  OnError = '[MasterDetail] On Error'
}


export class StartLoadMasterDetails implements Action {
  readonly type = MasterDetailActionTypes.StartLoadMasterDetails;
  readonly payLoad = {
    offset: 0
  };
}

export class EndLoadMasterDetails implements Action {
  readonly type = MasterDetailActionTypes.EndLoadMasterDetails;
  payLoad: PokemonList;

  constructor(payLoad: PokemonList) {
    this.payLoad = payLoad;
  }

}

export class EndAppendMasterDetails implements Action {
  readonly type = MasterDetailActionTypes.EndAppendMasterDetails;
  payLoad: PokemonList;

  constructor(payLoad: PokemonList) {
    this.payLoad = payLoad;
  }
}

export class StartAppendMasterDetails implements Action {
  readonly type = MasterDetailActionTypes.StartAppendMasterDetails;
}

export class StartGetDetail implements Action {
  readonly type = MasterDetailActionTypes.StartGetDetail;
  payLoad: number;

  constructor(payLoad: number) {
    this.payLoad = payLoad;
  }

}

export class EndGetDetail implements Action {
  readonly type = MasterDetailActionTypes.EndGetDetail;
  payLoad: Pokemon;

  constructor(payLoad: Pokemon) {
    this.payLoad = payLoad;
  }

}

export class OnError implements Action {
  readonly type = MasterDetailActionTypes.OnError;
  payLoad: string;

  constructor(payload: string) {
    this.payLoad = payload;
  }
}


export type MasterDetailActions = StartLoadMasterDetails |
                                  EndLoadMasterDetails |
                                  StartGetDetail |
                                  EndGetDetail |
                                  OnError;

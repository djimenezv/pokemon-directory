import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as masterDetailView from '../store/reducers';


export interface State {
  pokemonsContainer: masterDetailView.State;
}

export const reducers: ActionReducerMap<State> = {
  pokemonsContainer: masterDetailView.reducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

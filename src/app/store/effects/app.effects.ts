import { Injectable, OnDestroy } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of} from 'rxjs';
import { switchMap, flatMap, concatMap } from 'rxjs/operators';
import { MasterDetailActionTypes,
         StartLoadMasterDetails,
         EndLoadMasterDetails,
         StartAppendMasterDetails,
         EndAppendMasterDetails,
         StartGetDetail,
         EndGetDetail} from '../actions/master-detail.actions';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon } from '../../models/pokemon';
import * as fromRoot from '../../store/reducers';
import { Store } from '@ngrx/store';


@Injectable()
export class AppEffects implements OnDestroy {

  storeSubscription$;
  currentAppState: fromRoot.State;

  constructor(private actions$: Actions,
              private pokemonService: PokemonService,
              private store: Store<fromRoot.State>) {
      this.storeSubscription$ = this.store.select('pokemonsContainer')
      .subscribe(currentState => this.currentAppState = currentState);
    }

  @Effect()
  loadInitialPokemons$: Observable<Action> = this.actions$.pipe(
    ofType(MasterDetailActionTypes.StartLoadMasterDetails),
    switchMap((action: StartLoadMasterDetails) => this.pokemonService.getPokemons(action.payLoad.offset)),
    switchMap(result => of(new EndLoadMasterDetails(result)))
  );

  @Effect()
  appendPokemons$: Observable<Action> = this.actions$.pipe(
    ofType(MasterDetailActionTypes.StartAppendMasterDetails),
    switchMap((action: StartAppendMasterDetails) => this.pokemonService.getPokemons(this.currentAppState.currentOffset)
                                                      .pipe(
                                                        switchMap(result => of(new EndAppendMasterDetails(result)))
                                                      ))
    );

  @Effect()
  getPokemonById$: Observable<Action> = this.actions$.pipe(
      ofType(MasterDetailActionTypes.StartGetDetail),
      switchMap((action: StartGetDetail) => this.pokemonService.getPokemonById(this.currentAppState.selectedPokemonId)
                                                        .pipe(
                                                          switchMap((result: Pokemon) => of(new EndGetDetail(result)))
                                                        ))
  );


  ngOnDestroy() {
    this.storeSubscription$.unSubscribe();
  }


}

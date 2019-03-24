import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as constants from '../constants';
import * as actions from '../../store/actions/master-detail.actions';
import { Observable, fromEvent } from 'rxjs';
import * as fromFeature from '../../store/reducers';
import { allPokemonsAlreadyFetchedValidators } from './master.selectors';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit, OnDestroy {

  pokemonObservable$: Observable<fromFeature.State> = null;
  pokemonStateSubscription$;
  scrollEventSubscription$;
  state: fromRoot.State;
  allPokemonsAlreadyFetched = false;

  constructor(private store: Store<fromRoot.State>) {}

  /* view events */

  ngOnInit() {
    // state subscriptions
    this.createStateSubscriptions();
    // attaching listeners
    this.createEventScrollSubscription();
    // getting initial data
    this.store.dispatch(new actions.StartLoadMasterDetails());
  }

  ngOnDestroy() {
    this.pokemonStateSubscription$.unSubscribe();
    this.scrollEventSubscription$.unSubscribe();
  }

  /* subscriptions and observables creation methods*/

  createStateSubscriptions() {
    // state observable use directly in view through async pipe
    this.pokemonObservable$ = this.store
      .select((state: fromRoot.State) => state.pokemonsContainer);

    // all pokemons fetched indicator
    this.pokemonStateSubscription$ = this.store
      .select(allPokemonsAlreadyFetchedValidators)
      .subscribe((allPokemonsFetched: boolean) => {
          this.allPokemonsAlreadyFetched = allPokemonsFetched;
      });
  }

  createEventScrollSubscription() {
    this.scrollEventSubscription$ = fromEvent(document.getElementsByClassName('grid-scrollbar')[0], 'scroll')
                                      .subscribe(event => this.onScroll(event));
  }

  /* event handlers  */

  onScroll(event) {
    if (this.shouldGetData(event.srcElement)) {
      this.store.dispatch(new actions.StartAppendMasterDetails());
    }
  }

  onPokemonSelected(event, selectedPokemonId){
    this.store.dispatch(new actions.StartGetDetail(selectedPokemonId));
  }

  /* support methods */

  shouldGetData(targetEventElement) {
    return this.scrollAskForData(targetEventElement) && !this.allPokemonsAlreadyFetched;
  }

  scrollAskForData(targetEventElement): boolean {
    const scrollPercentage = ((targetEventElement.clientHeight + targetEventElement.scrollTop) / targetEventElement.scrollHeight) * 100;
    return scrollPercentage > constants.SCROLL_PERCENTAGE_THRESOLD_TO_GET_DATA;
  }

}

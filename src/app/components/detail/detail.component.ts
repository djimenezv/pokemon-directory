import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../reducers/index';
import { Pokemon } from '../../models/pokemon';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  detailStateObserver$: Observable<Pokemon>;
  processingDetailData$: Observable<boolean>;
  currentTab: number = 1;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.detailStateObserver$ = this.store.select(state => state.pokemonsContainer.selectedPokemonData);
    this.processingDetailData$ = this.store.select(state => state.pokemonsContainer.processingDetail);
  }

  setCurrentTab(tabId: number) {
    this.currentTab = tabId;
  }
}

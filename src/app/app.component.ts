import { Component,OnDestroy } from '@angular/core';
import * as fromRoot from './reducers';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnDestroy {
  title = 'pokemon';
  errorHandlerSubscription$: Subscription;

  constructor(private store: Store<fromRoot.State>,
              private toastr: ToastrService){
    this.errorHandlerSubscription$ = this.store.select(state => state.pokemonsContainer.errorMessage)
                                      .subscribe(error => this.showErrorMessage(error));
  }

  showErrorMessage(errorMessage: string) {
    if (errorMessage) {
      this.toastr.error(errorMessage, 'Error', {timeOut: 3000});
    }
  }

  ngOnDestroy() {
    this.errorHandlerSubscription$.unsubscribe();
  }
}

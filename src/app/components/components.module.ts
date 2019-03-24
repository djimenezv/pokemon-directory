import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './master/master.component';
import { MasterDetailComponent} from './master-detail/master-detail.component';
import { DetailComponent } from './detail/detail.component';
import { LoaderIndicatorComponent } from './loader-indicator/loader-indicator.component';

@NgModule({
  declarations: [
    MasterDetailComponent,
    MasterComponent,
    DetailComponent,
    LoaderIndicatorComponent
],
  imports: [
    CommonModule
  ],
  exports: [
    MasterDetailComponent
  ]
})
export class ComponentsModule { }

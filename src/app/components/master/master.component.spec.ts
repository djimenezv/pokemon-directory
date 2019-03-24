import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterComponent } from './master.component';
import { LoaderIndicatorComponent } from '../loader-indicator/loader-indicator.component';
import { Store } from '@ngrx/store';
import { StoreModule } from '@ngrx/store'
describe('MasterComponent', () => {
  let component: MasterComponent;
  let fixture: ComponentFixture<MasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
                      MasterComponent,
                      LoaderIndicatorComponent
                    ],
      providers: [StoreModule,
                  Store],
      imports:[StoreModule.forRoot({})]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

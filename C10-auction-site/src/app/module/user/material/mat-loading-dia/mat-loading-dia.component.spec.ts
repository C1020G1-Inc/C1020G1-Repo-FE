import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatLoadingDiaComponent } from './mat-loading-dia.component';

describe('MatLoadingDiaComponent', () => {
  let component: MatLoadingDiaComponent;
  let fixture: ComponentFixture<MatLoadingDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatLoadingDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatLoadingDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatRegisDiaComponent } from './mat-regis-dia.component';

describe('MatRegisDiaComponent', () => {
  let component: MatRegisDiaComponent;
  let fixture: ComponentFixture<MatRegisDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatRegisDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatRegisDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

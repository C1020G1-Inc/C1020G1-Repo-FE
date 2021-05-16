import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatExpiredDiaComponent } from './mat-expired-dia.component';

describe('MatExpiredDiaComponent', () => {
  let component: MatExpiredDiaComponent;
  let fixture: ComponentFixture<MatExpiredDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatExpiredDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatExpiredDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

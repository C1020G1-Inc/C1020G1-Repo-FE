import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionCartComponent } from './auction-cart.component';

describe('AuctionCartComponent', () => {
  let component: AuctionCartComponent;
  let fixture: ComponentFixture<AuctionCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

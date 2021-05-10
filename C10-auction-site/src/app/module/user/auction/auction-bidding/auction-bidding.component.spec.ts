import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionBiddingComponent } from './auction-bidding.component';

describe('AuctionBiddingComponent', () => {
  let component: AuctionBiddingComponent;
  let fixture: ComponentFixture<AuctionBiddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionBiddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionBiddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

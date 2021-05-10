import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAuctionProductComponent } from './history-auction-product.component';

describe('HistoryAuctionProductComponent', () => {
  let component: HistoryAuctionProductComponent;
  let fixture: ComponentFixture<HistoryAuctionProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAuctionProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAuctionProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

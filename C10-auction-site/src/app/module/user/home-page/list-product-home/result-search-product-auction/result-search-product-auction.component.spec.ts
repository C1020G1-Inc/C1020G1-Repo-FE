import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultSearchProductAuctionComponent } from './result-search-product-auction.component';

describe('ResultSearchProductAuctionComponent', () => {
  let component: ResultSearchProductAuctionComponent;
  let fixture: ComponentFixture<ResultSearchProductAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultSearchProductAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultSearchProductAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

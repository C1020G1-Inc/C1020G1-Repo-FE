import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductTopAuctionComponent } from './list-product-top-auction.component';

describe('ListProductTopAuctionComponent', () => {
  let component: ListProductTopAuctionComponent;
  let fixture: ComponentFixture<ListProductTopAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductTopAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductTopAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

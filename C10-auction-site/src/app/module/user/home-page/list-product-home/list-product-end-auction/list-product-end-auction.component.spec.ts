import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductEndAuctionComponent } from './list-product-end-auction.component';

describe('ListProductEndAuctionComponent', () => {
  let component: ListProductEndAuctionComponent;
  let fixture: ComponentFixture<ListProductEndAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductEndAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductEndAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

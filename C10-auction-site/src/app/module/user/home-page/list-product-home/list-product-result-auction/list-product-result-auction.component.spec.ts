import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductResultAuctionComponent } from './list-product-result-auction.component';

describe('ListProductResultAuctionComponent', () => {
  let component: ListProductResultAuctionComponent;
  let fixture: ComponentFixture<ListProductResultAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductResultAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductResultAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

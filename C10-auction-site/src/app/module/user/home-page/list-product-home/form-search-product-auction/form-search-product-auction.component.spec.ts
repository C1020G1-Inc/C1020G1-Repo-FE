import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSearchProductAuctionComponent } from './form-search-product-auction.component';

describe('FormSearchProductAuctionComponent', () => {
  let component: FormSearchProductAuctionComponent;
  let fixture: ComponentFixture<FormSearchProductAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSearchProductAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSearchProductAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

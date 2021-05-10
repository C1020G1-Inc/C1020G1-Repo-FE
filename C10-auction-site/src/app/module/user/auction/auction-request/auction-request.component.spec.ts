import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuctionRequestComponent } from './auction-request.component';

describe('AuctionRequestComponent', () => {
  let component: AuctionRequestComponent;
  let fixture: ComponentFixture<AuctionRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuctionRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuctionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

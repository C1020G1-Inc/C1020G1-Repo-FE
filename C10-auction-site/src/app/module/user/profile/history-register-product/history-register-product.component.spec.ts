import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryRegisterProductComponent } from './history-register-product.component';

describe('HistoryRegisterProductComponent', () => {
  let component: HistoryRegisterProductComponent;
  let fixture: ComponentFixture<HistoryRegisterProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryRegisterProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryRegisterProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

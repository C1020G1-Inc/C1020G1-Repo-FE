import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductHomeComponent } from './list-product-home.component';

describe('ListProductHomeComponent', () => {
  let component: ListProductHomeComponent;
  let fixture: ComponentFixture<ListProductHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductChartDonutComponent } from './product-chart-donut.component';

describe('ProductChartDonutComponent', () => {
  let component: ProductChartDonutComponent;
  let fixture: ComponentFixture<ProductChartDonutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductChartDonutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductChartDonutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListProductAdminComponent} from './list-product-admin/list-product-admin.component';
import {ProductChartComponent} from './product-chart/product-chart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ChartsModule} from 'ng2-charts';
import {RouterModule} from '@angular/router';
import {LeftSideBarModule} from '../left-side-bar/left-side-bar.module';


@NgModule({
  declarations: [ListProductAdminComponent, ProductChartComponent,],
  exports: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ChartsModule,
    ReactiveFormsModule,
    RouterModule,
    LeftSideBarModule
  ]
})
export class ProductManagementModule {
}

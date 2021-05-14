import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductAdminComponent } from './list-product-admin/list-product-admin.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductChartComponent } from './product-chart/product-chart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ChartsModule} from 'ng2-charts';
import { LoadingComponent } from './loading/loading.component';




@NgModule({
  declarations: [ListProductAdminComponent, UpdateProductComponent, ProductChartComponent, LoadingComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ChartsModule,
    ReactiveFormsModule
  ]
})
export class ProductManagementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductAdminComponent } from './list-product-admin/list-product-admin.component';
import { ApproveProductComponent } from './approve-product/approve-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductChartComponent } from './product-chart/product-chart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {ChartsModule} from 'ng2-charts';




@NgModule({
  declarations: [ListProductAdminComponent, ApproveProductComponent, UpdateProductComponent, ProductChartComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    ChartsModule,
    ReactiveFormsModule
  ]
})
export class ProductManagementModule { }

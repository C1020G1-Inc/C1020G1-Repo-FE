import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductAdminComponent } from './list-product-admin/list-product-admin.component';
import { ApproveProductComponent } from './approve-product/approve-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { ProductChartComponent } from './product-chart/product-chart.component';



@NgModule({
  declarations: [ListProductAdminComponent, ApproveProductComponent, UpdateProductComponent, ProductChartComponent],
  imports: [
    CommonModule
  ]
})
export class ProductManagementModule { }

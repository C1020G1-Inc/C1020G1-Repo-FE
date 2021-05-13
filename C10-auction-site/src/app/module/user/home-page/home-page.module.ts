import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductHomeComponent } from './list-product-home/list-product-home.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CommentProductComponent } from './comment-product/comment-product.component';
import { GuideComponent } from './guide/guide.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [ListProductHomeComponent, DetailProductComponent, CommentProductComponent, GuideComponent],
  imports: [
    CommonModule,
    NgxPaginationModule
  ]
})
export class HomePageModule { }

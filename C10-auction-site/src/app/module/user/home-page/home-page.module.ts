import { HeaderFooterModule } from './../header-footer/header-footer.module';
import { ProfileModule } from './../profile/profile.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductHomeComponent } from './list-product-home/list-product-home.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { CommentProductComponent } from './comment-product/comment-product.component';
import { GuideComponent } from './guide/guide.component';



@NgModule({
  declarations: [ListProductHomeComponent, DetailProductComponent, CommentProductComponent, GuideComponent],
  imports: [
    CommonModule,
    HeaderFooterModule
  ]
})
export class HomePageModule { }

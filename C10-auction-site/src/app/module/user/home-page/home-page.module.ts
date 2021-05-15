import {NgModule} from '@angular/core';
import {ListProductHomeComponent} from './list-product-home/list-product-home.component';
import {CommentProductComponent} from './comment-product/comment-product.component';
import {DetailProductComponent} from './detail-product/detail-product.component';
import {GuideComponent} from './guide/guide.component';
import {ListProductEndAuctionComponent} from './list-product-home/list-product-end-auction/list-product-end-auction.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {HeaderFooterModule} from '../header-footer/header-footer.module';


@NgModule({
  declarations: [ListProductHomeComponent,
    DetailProductComponent, CommentProductComponent, GuideComponent, ListProductEndAuctionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgxPaginationModule,
    RouterModule,
    HeaderFooterModule
  ]
})
export class HomePageModule {
}

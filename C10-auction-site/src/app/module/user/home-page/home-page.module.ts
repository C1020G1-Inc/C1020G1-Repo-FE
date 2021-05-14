import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListProductHomeComponent} from './list-product-home/list-product-home.component';
import {DetailProductComponent} from './detail-product/detail-product.component';
import {CommentProductComponent} from './comment-product/comment-product.component';
import {GuideComponent} from './guide/guide.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import {NgxPaginationModule} from 'ngx-pagination';
import {ListProductEndAuctionComponent} from './list-product-home/list-product-end-auction/list-product-end-auction.component';
import {RouterModule} from '@angular/router';


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
  ]
})
export class HomePageModule {
}

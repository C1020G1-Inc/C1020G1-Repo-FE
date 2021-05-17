import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListProductHomeComponent} from './list-product-home/list-product-home.component';
import {DetailProductComponent} from './detail-product/detail-product.component';
import {CommentProductComponent} from './comment-product/comment-product.component';
import {GuideComponent} from './guide/guide.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ListProductEndAuctionComponent} from './list-product-home/list-product-end-auction/list-product-end-auction.component';
import {RouterModule} from '@angular/router';
import { ListProductResultAuctionComponent } from './list-product-home/list-product-result-auction/list-product-result-auction.component';
import { ListProductTopAuctionComponent } from './list-product-home/list-product-top-auction/list-product-top-auction.component';
import { FormSearchProductAuctionComponent } from './list-product-home/form-search-product-auction/form-search-product-auction.component';
import {ResultSearchProductAuctionComponent} from './list-product-home/result-search-product-auction/result-search-product-auction.component';
import {CountdownModule} from 'ngx-countdown';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListProductHomeComponent, DetailProductComponent, CommentProductComponent, GuideComponent, ListProductEndAuctionComponent, ListProductResultAuctionComponent, ListProductTopAuctionComponent, FormSearchProductAuctionComponent, ResultSearchProductAuctionComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule,
    CountdownModule,
    ReactiveFormsModule,
  ]
})
export class HomePageModule {
}

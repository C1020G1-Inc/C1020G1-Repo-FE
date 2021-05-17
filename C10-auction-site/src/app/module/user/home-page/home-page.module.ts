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
import {FormSearchProductAuctionComponent} from './list-product-home/form-search-product-auction/form-search-product-auction.component';
import {ResultSearchProductAuctionComponent} from './list-product-home/result-search-product-auction/result-search-product-auction.component';
import {ListProductTopAuctionComponent} from './list-product-home/list-product-top-auction/list-product-top-auction.component';
import {ListProductResultAuctionComponent} from './list-product-home/list-product-result-auction/list-product-result-auction.component';
import {CountdownModule} from 'ngx-countdown';


@NgModule({
  declarations: [ListProductHomeComponent,
    DetailProductComponent,
    CommentProductComponent,
    GuideComponent,
    ListProductEndAuctionComponent,
    FormSearchProductAuctionComponent,
    ResultSearchProductAuctionComponent,
    ListProductResultAuctionComponent,
    ListProductTopAuctionComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgxPaginationModule,
    RouterModule,
    HeaderFooterModule,
    CountdownModule
  ]
})
export class HomePageModule {
}

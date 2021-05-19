import { AdminAuthGuardService } from './service/authentication/admin-auth-guard.service';
import { AuthGuardService } from './service/authentication/auth-guard.service';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminModule} from './module/admin/admin.module';
import {UserModule} from './module/user/user.module';
import {ListUserComponent} from './module/admin/user-management/list-user/list-user.component';
import {UserChartComponent} from './module/admin/user-management/user-chart/user-chart.component';
import {ProductChartComponent} from './module/admin/product-management/product-chart/product-chart.component';
import {ListProductAdminComponent} from './module/admin/product-management/list-product-admin/list-product-admin.component';
import {LoginComponent} from './module/user/login/login/login.component';
import {RegisterComponent} from './module/user/profile/register/register.component';
import {ForgotPasswordComponent} from './module/user/profile/forgot-password/forgot-password.component';
import {UpdateProfileComponent} from './module/user/profile/update-profile/update-profile.component';
import {HistoryRegisterProductComponent} from './module/user/profile/history-register-product/history-register-product.component';
import {HistoryAuctionProductComponent} from './module/user/profile/history-auction-product/history-auction-product.component';
import {ViewProfileComponent} from './module/user/profile/view-profile/view-profile.component';
import {ListProductHomeComponent} from './module/user/home-page/list-product-home/list-product-home.component';
import {DetailProductComponent} from './module/user/home-page/detail-product/detail-product.component';
import {GuideComponent} from './module/user/home-page/guide/guide.component';
import {AuctionBiddingComponent} from './module/user/auction/auction-bidding/auction-bidding.component';
import {AuctionRequestComponent} from './module/user/auction/auction-request/auction-request.component';
import {AuctionCartComponent} from './module/user/auction/auction-cart/auction-cart.component';
import {AuctionPaymentComponent} from './module/user/auction/auction-payment/auction-payment.component';
import {InvoiceComponent} from './module/user/auction/invoice/invoice.component';
import {ListTransactionComponent} from './module/admin/transaction-management/list-transaction/list-transaction.component';
import {AdminChatComponent} from './module/admin/admin-chat/admin-chat.component';
import {ListProductEndAuctionComponent} from './module/user/home-page/list-product-home/list-product-end-auction/list-product-end-auction.component';
import {ErrorComponent} from './module/error/error.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ListProductResultAuctionComponent} from './module/user/home-page/list-product-home/list-product-result-auction/list-product-result-auction.component';
import {ListProductTopAuctionComponent} from './module/user/home-page/list-product-home/list-product-top-auction/list-product-top-auction.component';
import {ResultSearchProductAuctionComponent} from './module/user/home-page/list-product-home/result-search-product-auction/result-search-product-auction.component';
import {ProductChartDonutComponent} from './module/admin/product-management/product-chart-donut/product-chart-donut.component';
import {HomePageModule} from './module/user/home-page/home-page.module';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {path: 'user-management/list', component: ListUserComponent},
      {path: 'user-management/chart', component: UserChartComponent},
      {path: 'product-management/list', component: ListProductAdminComponent},
      {path: 'product-management/chart', component: ProductChartComponent},
      {path: 'product-management/chart/donut', component: ProductChartDonutComponent},
      {path: 'transactions', component: ListTransactionComponent},
      {path: 'chat', component: AdminChatComponent},
    ], canActivate: [AdminAuthGuardService]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {
    path: 'profile',
    children: [
      {path: 'view', component: ViewProfileComponent, canActivate: [AuthGuardService]},
      {path: 'update/:id', component: UpdateProfileComponent},
      {path: 'history-register', component: HistoryRegisterProductComponent},
      {path: 'history-auction', component: HistoryAuctionProductComponent},
    ]
  },
  {
    path: 'home',
    children: [
      {path: '', component: ListProductHomeComponent},
      {path: 'end', component: ListProductEndAuctionComponent},
      {path: 'result', component: ListProductResultAuctionComponent},
      {path: 'top', component: ListProductTopAuctionComponent},
      {path: 'search/result', component: ResultSearchProductAuctionComponent},
    ],
  },
  {path: 'detail/:id', component: DetailProductComponent},
  {path: 'guide', component: GuideComponent},
  {
    path: 'auction',
    children: [
      {path: 'bidding/:id', component: AuctionBiddingComponent},
      {path: 'request', component: AuctionRequestComponent},
      {path: 'cart', component: AuctionCartComponent},
      {path: 'payment', component: AuctionPaymentComponent},
      {path: 'invoice', component: InvoiceComponent}

    ], canActivate: [AuthGuardService]
  },
  {path: '', component: ListProductHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminModule, UserModule, RouterModule , NgxPaginationModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

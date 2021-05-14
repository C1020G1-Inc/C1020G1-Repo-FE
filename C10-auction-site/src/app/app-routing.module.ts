import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminModule} from './module/admin/admin.module';
import {UserModule} from './module/user/user.module';
import {ListUserComponent} from './module/admin/user-management/list-user/list-user.component';
import {UserChartComponent} from './module/admin/user-management/user-chart/user-chart.component';
import {ProductChartComponent} from './module/admin/product-management/product-chart/product-chart.component';
import {ListProductAdminComponent} from './module/admin/product-management/list-product-admin/list-product-admin.component';
import {TransactionManagementModule} from './module/admin/transaction-management/transaction-management.module';
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
import {AdminChatComponent} from './module/admin/admin-chat/admin-chat/admin-chat.component';
import {ErrorComponent} from './module/error/error.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {path: 'user-management/list', component: ListUserComponent},
      {path: 'user-management/chart', component: UserChartComponent},
      {path: 'product-management/list', component: ListProductAdminComponent},
      {path: 'product-management/chart', component: ProductChartComponent},
      {path: 'transactions', component: TransactionManagementModule},
      {path: 'chat/:roomname', component: AdminChatComponent},
      {path: 'chat', component: AdminChatComponent},
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {
    path: 'profile',
    children: [
      {path: 'update', component: UpdateProfileComponent},
      {path: '', component: ViewProfileComponent},
      {path: 'history-register', component: HistoryRegisterProductComponent},
      {path: 'history-auction', component: HistoryAuctionProductComponent},
    ],
  },
  {path: 'home', component: ListProductHomeComponent},
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
    ]
  },
  {path: '', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AdminModule, UserModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

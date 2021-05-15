import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuctionRequestComponent} from './auction-request/auction-request.component';
import {AuctionBiddingComponent} from './auction-bidding/auction-bidding.component';
import {AuctionCartComponent} from './auction-cart/auction-cart.component';
import {AuctionPaymentComponent} from './auction-payment/auction-payment.component';
import {InvoiceComponent} from './invoice/invoice.component';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileModule} from '../profile/profile.module';
import {UserModule} from '../user.module';
import {HeaderFooterModule} from '../header-footer/header-footer.module';


@NgModule({
  declarations: [AuctionRequestComponent, AuctionBiddingComponent, AuctionCartComponent, AuctionPaymentComponent, InvoiceComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        ReactiveFormsModule,
        HeaderFooterModule,
    ]
})
export class AuctionModule {
}

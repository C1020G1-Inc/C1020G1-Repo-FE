import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionRequestComponent } from './auction-request/auction-request.component';
import { AuctionBiddingComponent } from './auction-bidding/auction-bidding.component';
import { AuctionCartComponent } from './auction-cart/auction-cart.component';
import { AuctionPaymentComponent } from './auction-payment/auction-payment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxLoadingModule} from 'ngx-loading';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {HeaderFooterModule} from '../header-footer/header-footer.module';


@NgModule({
  declarations: [AuctionRequestComponent, AuctionBiddingComponent, AuctionCartComponent, AuctionPaymentComponent, InvoiceComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxLoadingModule,
        HttpClientModule,
        RouterModule,
        HeaderFooterModule,
    ]
})
export class AuctionModule {
}


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionRequestComponent } from './auction-request/auction-request.component';
import { AuctionBiddingComponent } from './auction-bidding/auction-bidding.component';
import { AuctionCartComponent } from './auction-cart/auction-cart.component';
import { AuctionPaymentComponent } from './auction-payment/auction-payment.component';
import { InvoiceComponent } from './invoice/invoice.component';



@NgModule({
  declarations: [AuctionRequestComponent, AuctionBiddingComponent, AuctionCartComponent, AuctionPaymentComponent, InvoiceComponent],
  imports: [
    CommonModule
  ]
})
export class AuctionModule { }

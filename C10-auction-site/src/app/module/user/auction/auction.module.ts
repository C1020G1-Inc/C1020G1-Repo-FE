import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionBiddingComponent } from './auction-bidding/auction-bidding.component';
import { AuctionCartComponent } from './auction-cart/auction-cart.component';
import { AuctionPaymentComponent } from './auction-payment/auction-payment.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CreateProductComponent } from './auction-request/create-product/create-product.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [CreateProductComponent, AuctionBiddingComponent, AuctionCartComponent, AuctionPaymentComponent, InvoiceComponent, CreateProductComponent],
  exports: [
    CreateProductComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AuctionModule { }

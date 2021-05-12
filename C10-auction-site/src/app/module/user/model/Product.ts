import {Account} from './Account';

export interface Product {
  productId: number ;
  productName: string ;
  price: number ;
  priceStep: number ;
  serviceFee: number ;
  quantity: number ;
  lastPrice: number ;
  description: string ;
  registerTime: string ;
  auctionTime: string ;
  endTime: string ;
  account: Account[] ;
}

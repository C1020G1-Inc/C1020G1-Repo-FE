import {Account} from './account';

export interface Auction {
  auctionId: number ;
  price: string ;
  timeAuction: string ;
  status: string ;
  account: Account ;
}

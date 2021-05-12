import {Account} from './Account';

export interface Auction {
  auctionId: number ;
  price: string ;
  timeAuction: string ;
  status: string ;
  account: Account[] ;
}

import {Account} from '../models/model/Account';

export interface Auction {
  auctionId: number ;
  price: string ;
  timeAuction: string ;
  status: string ;
  account: Account ;
}

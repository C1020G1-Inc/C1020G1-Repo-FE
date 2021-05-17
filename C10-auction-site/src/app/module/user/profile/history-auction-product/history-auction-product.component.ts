import { Component, OnInit } from '@angular/core';
import {AuctionProduct} from '../../../../model/AuctionProduct';
import {ProfileService} from '../profile.service';
import {TokenStorageService} from '../../../../service/authentication/token-storage';
import {Account} from '../../../../model/account';

@Component({
  selector: 'app-history-auction-product',
  templateUrl: './history-auction-product.component.html',
  styleUrls: ['./history-auction-product.component.css']
})
export class HistoryAuctionProductComponent implements OnInit {
  public productAuction: AuctionProduct[];
  data;
  public pageNumber = 0;
  account: Account
  constructor(private profileService: ProfileService,
              private tokenStorage: TokenStorageService) { }

  getAllProduct(){
    this.profileService.getAllProductAuction(this.account.accountId, this.pageNumber).subscribe( data1 => {
      const listAuction = data1.content;
      this.data = data1;
      if (this.productAuction != null){
        this.productAuction = this.productAuction.concat(listAuction);
      }else {
        this.productAuction = listAuction;
      }
    });
  }
  ngOnInit(): void {
    this.productAuction = null;
    this.account = this.tokenStorage.getAccount();
    this.getAllProduct();
  }
  loadMoreProduct() {
    this.pageNumber++;
    this.getAllProduct();
  }
}

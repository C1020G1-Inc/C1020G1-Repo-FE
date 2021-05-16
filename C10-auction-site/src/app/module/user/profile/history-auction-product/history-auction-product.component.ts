import { Component, OnInit } from '@angular/core';
import {AuctionProduct} from '../../../../model/AuctionProduct';
import {ProfileService} from '../profile.service';

@Component({
  selector: 'app-history-auction-product',
  templateUrl: './history-auction-product.component.html',
  styleUrls: ['./history-auction-product.component.css']
})
export class HistoryAuctionProductComponent implements OnInit {
  public productAuction: AuctionProduct[];
  data;
  public pageNumber = 0;
  constructor(private profileService: ProfileService) { }

  getAllProduct(){
    this.profileService.getAllProductAuction(1, this.pageNumber).subscribe( data1 => {
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
    this.getAllProduct();
  }
  loadMoreProduct() {
    this.pageNumber++;
    this.getAllProduct();
  }
}

import {Component, OnInit} from '@angular/core';
import {AuctionBackendService} from '../../../../service/auction-backend.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ProductDetail} from '../../../../model/auction-bidding.model';
import {interval, Observable} from 'rxjs';

@Component({
  selector: 'app-auction-bidding',
  templateUrl: './auction-bidding.component.html',
  styleUrls: ['./auction-bidding.component.css']
})
export class AuctionBiddingComponent implements OnInit {

  public productId: number;
  public productDetail: ProductDetail;
  public auctionEndTime: Date;
  public day = 0;
  public hour = 0;
  public minute = 0;
  public second = 0;

  constructor(public auctionBackendService: AuctionBackendService,
              public activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (param: Params) => {
        this.productId = param.id;
      });

    this.auctionBackendService.getProductDetail(this.productId)
      .subscribe((data: ProductDetail) => {
        this.productDetail = data;
        this.productDetail.registerTime = new Date(this.productDetail.registerTime);
        this.auctionEndTime = new Date(this.productDetail.registerTime.getTime() + this.productDetail.auctionTime * 60 * 1000);
      });

    const changeBySecond = interval(1000).subscribe(() => {
      const time: Date = new Date();
      const differentInTime = this.auctionEndTime.getTime() - time.getTime();
      if (differentInTime > 0) {
        this.day = Math.floor(differentInTime / (1000 * 60 * 60 * 24));
        this.hour = Math.floor(differentInTime / (1000 * 60 * 60)) - this.day * 24;
        this.minute = Math.floor(differentInTime / (1000 * 60)) - this.hour * 60 - this.day * 24 * 60;
        this.second = Math.floor(differentInTime / 1000) - this.day * 24 * 60 * 60 - this.hour * 60 * 60 - this.minute * 60;
      }
    });
  }
}

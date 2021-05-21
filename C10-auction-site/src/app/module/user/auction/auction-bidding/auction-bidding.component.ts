import {Component, OnInit} from '@angular/core';
import {AuctionBackendService} from '../../../../service/auction-bidding/auction-backend.service';
import {ActivatedRoute, Params} from '@angular/router';
import {HistoryAuction, ProductDetail} from '../../../../model/auction-bidding.model';
import {interval} from 'rxjs';
import {FirebaseDatabaseService} from '../../../../service/auction-bidding/firebase-database.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ZoomComponent} from '../../../admin/admin-chat/zoom/zoom.component';
import {MatDialog} from '@angular/material/dialog';

declare const $: any;

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
  public historyAuction: HistoryAuction;
  public priceForm: FormGroup;
  public currentPrice: number;
  public currentStep: number;
  public currentWinner = '-';
  public isInProgress: boolean;
  public isNewCart = false;
  public statusTranslate = {
    1: "Chưa bắt đầu",
    2: "Đang đấu giá",
    3: "Kết thúc"
  };
  public status = 1;

  constructor(public auctionBackendService: AuctionBackendService,
              public activateRoute: ActivatedRoute,
              public firebaseDatabaseService: FirebaseDatabaseService,
              public dialog: MatDialog) {
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
        this.currentPrice = (this.productDetail.lastPrice) ? this.productDetail.lastPrice : this.productDetail.price;
        this.currentStep = this.productDetail.priceStep;
        this.isInProgress = this.productDetail.productStatus.id === 2;
        this.status = (this.productDetail.productStatus.id > 2) ? 3 : this.productDetail.productStatus.id;
      });

    const changeBySecond = interval(1000).subscribe(() => {
      if (this.status > 1) {
        const time: Date = new Date();
        const differentInTime = this.auctionEndTime.getTime() - time.getTime();
        if (differentInTime > 0) {
          this.day = Math.floor(differentInTime / (1000 * 60 * 60 * 24));
          this.hour = Math.floor(differentInTime / (1000 * 60 * 60)) - this.day * 24;
          this.minute = Math.floor(differentInTime / (1000 * 60)) - this.hour * 60 - this.day * 24 * 60;
          this.second = Math.floor(differentInTime / 1000) - this.day * 24 * 60 * 60 - this.hour * 60 * 60 - this.minute * 60;
          return;
        }
        this.isInProgress = false;
        this.status = 3
        changeBySecond.unsubscribe();
        getListAuction.unsubscribe();
      }
    });

    this.auctionBackendService.getListAuction(this.productId).subscribe(data => {
      if (data != null) {
        data.auctions.map(a => a.timeAuction = new Date(a.timeAuction));
        this.historyAuction = data;
        if (this.historyAuction.auctions[0]) {
          this.currentPrice = this.historyAuction.auctions[0]?.price;
          this.currentWinner = this.historyAuction.auctions[0]?.accountName;
        }
        this.currentStep = this.historyAuction.currentStep;
      }
    });

    const getListAuction = this.firebaseDatabaseService.getListAuction(this.productId).subscribe(data => {
      if (data?.auctions != null) {
        data.auctions.map(a => a.timeAuction = new Date(a.timeAuction.time));
        this.historyAuction = data;
        this.currentPrice = this.historyAuction.auctions[0].price;
        this.currentWinner = this.historyAuction.auctions[0].accountName;
        this.currentStep = this.historyAuction.currentStep;
      }
    });

    this.priceForm = new FormGroup({
      newPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$"), this.confirmEmailValidator()])
    });

  }

  submit() {
    this.auctionBackendService.submitAuction({
      productId: this.productId,
      timeAuction: new Date(),
      price: this.priceForm.controls.newPrice.value
    }).subscribe(() => {
      $('#toast-success').toast('show');
      this.priceForm = new FormGroup({
        newPrice: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$") , this.confirmEmailValidator()])
      });
    });
  }

  confirmEmailValidator() {
    return (control: AbstractControl) => {
      const price = control.value;
      if (price < this.currentPrice + this.currentStep) {
        return {low_price: true};
      }
      if (price % this.currentStep !== 0) {
        return {not_divide: true};
      }
      return null;
    };
  }

  increasePrice() {
    if (this.priceForm.controls.newPrice.value === '' || +this.priceForm.controls.newPrice.value
      + this.currentStep < this.currentPrice + this.currentStep) {
      this.priceForm.controls.newPrice.setValue(Math.ceil(this.currentPrice / this.currentStep) * this.currentStep + this.currentStep);
      return;
    }
    if (this.priceForm.controls.newPrice.value % this.currentStep === 0) {
      this.priceForm.controls.newPrice.setValue(+this.priceForm.controls.newPrice.value + this.currentStep);
      return;
    }
    this.priceForm.controls.newPrice.setValue(Math.ceil(+this.priceForm.controls.newPrice.value / this.currentStep) * this.currentStep);
  }

  decreasePrice() {
    if (this.priceForm.controls.newPrice.value === '' || +this.priceForm.controls.newPrice.value
      - this.currentStep < Math.ceil(this.currentPrice / this.currentStep) * this.currentStep + this.currentStep) {
      this.priceForm.controls.newPrice.setValue(Math.ceil(this.currentPrice / this.currentStep) * this.currentStep + this.currentStep);
      return;
    }
    if (this.priceForm.controls.newPrice.value % this.currentStep === 0) {
      this.priceForm.controls.newPrice.setValue(+this.priceForm.controls.newPrice.value - this.currentStep);
      return;
    }
    this.priceForm.controls.newPrice.setValue(Math.floor(+this.priceForm.controls.newPrice.value / this.currentStep) * this.currentStep);
  }

  zoom(url) {
    this.dialog.open(ZoomComponent, {
      data: url,
      panelClass: 'custom-modalbox'
    });
  }

}

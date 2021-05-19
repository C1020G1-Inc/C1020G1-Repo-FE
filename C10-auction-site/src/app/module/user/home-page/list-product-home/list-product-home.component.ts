import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {interval} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {LoadingComponent} from '../../../loading/loading/loading.component';
import {ListProductAuctionService} from '../../../../service/product/list-product-auction.service';
import {ProductImage} from '../../../../model/ProductImage';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list-product-home',
  templateUrl: './list-product-home.component.html',
  styleUrls: ['./list-product-home.component.css']
})
export class ListProductHomeComponent implements OnInit {

  constructor(private listProductAuctionService: ListProductAuctionService,
              private cdref: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  public listProduct = new Array<ProductImage>();
  public page = 1;
  public activeOne = 'active';
  public activeTwo;
  public activeThree;
  public activeFour;
  public activeFive;
  public category = 0;
  public checkListProduct;

  ngOnInit(): void {
    this.openLoading();
    this.listProductAuctionService.showAllProductAuction(this.category).subscribe((data) => {
      this.listProduct = data;
      this.checkListProduct = this.listProduct.length !== 0;
      if (this.checkListProduct === false) {
        this.dialog.closeAll();
      }
    });
    this.updateHomePage();
  }

  updateHomePage(){
    const changeBySecond = interval(10000).subscribe(() => {
      this.listProductAuctionService.showAllProductAuction(this.category).subscribe((data) => {
        this.listProduct = data;
        this.checkListProduct = this.listProduct.length !== 0;
        if (this.checkListProduct === false) {
          this.dialog.closeAll();
        }
      });
    });
  }

  getTimeRemain(date: string, auctionTime: number) {
    const auctionTimeMilisecond = auctionTime * 60 * 1000;
    return (((new Date(date).getTime() + auctionTimeMilisecond) - new Date().getTime()) / 1000) % 86400;
  }
  getDayRemain(date: string, auctionTime: number) {
    const auctionTimeMilisecond = auctionTime * 60 * 1000;
    const timeDayRemain = (Math.floor((((new Date(date).getTime() + auctionTimeMilisecond) - new Date().getTime()) / 1000) / 86400));
    if (timeDayRemain > 0) {
      return timeDayRemain + 'N';
    } else {
      return '';
    }
  }

  openLoading() {
    this.dialog.open(LoadingComponent, {
      width: '500px',
      height: '200px',
      disableClose: true
    });
    setTimeout(() => {
      this.dialog.closeAll();
    }, 2000);
  }

  showByAll() {
    this.activeOne = 'active';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.category = 0;
    this.ngOnInit();
  }

  showByHouseHold() {
    this.activeOne = '';
    this.activeTwo = 'active';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = '';
    this.category = 2;
    this.ngOnInit();
  }

  showByTechnology() {
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = 'active';
    this.activeFour = '';
    this.activeFive = '';
    this.category = 1;
    this.ngOnInit();
  }

  showByHot() {
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = 'active';
    this.activeFive = '';
    this.category = 4;
    this.ngOnInit();
  }

  showByOther() {
    this.activeOne = '';
    this.activeTwo = '';
    this.activeThree = '';
    this.activeFour = '';
    this.activeFive = 'active';
    this.category = 3;
    this.ngOnInit();
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}

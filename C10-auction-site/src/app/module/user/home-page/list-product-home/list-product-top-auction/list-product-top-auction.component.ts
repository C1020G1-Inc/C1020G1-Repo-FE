import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListProductAuctionService} from '../list-product-auction.service';
import {MatDialog} from '@angular/material/dialog';
import {interval} from "rxjs";
import {LoadingComponent} from "../../../../loading/loading/loading.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-list-product-top-auction',
  templateUrl: './list-product-top-auction.component.html',
  styleUrls: ['./list-product-top-auction.component.css']
})
export class ListProductTopAuctionComponent implements OnInit {

  constructor(private listProductService: ListProductAuctionService,
              private cdref: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  public listProduct: [];
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
    const changeBySecond = interval(1000).subscribe(() => {
      this.listProductService.showTop5ProductAuction(this.category).subscribe((data) => {
        console.log(data);
        this.listProduct = data;
        this.checkListProduct = this.listProduct.length !== 0;
        if (this.checkListProduct === false) {
          this.dialog.closeAll();
        }
      });
    });
  }

  getTimeRemain(date: string) {
    return ((new Date(date).getTime() - new Date().getTime()) / 1000) % 86400;
  }

  getDayRemain(date: string) {
    const timeDayRemain = (Math.floor(((new Date(date).getTime() - new Date().getTime()) / 1000) / 86400));
    if (timeDayRemain > 0) {
      return timeDayRemain + ' D';
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

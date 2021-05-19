import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {interval} from 'rxjs';
import {LoadingComponent} from '../../../../loading/loading/loading.component';
import {ListProductAuctionService} from '../../../../../service/product/list-product-auction.service';
import {Product} from '../../../../../model/Product';


@Component({
  selector: 'app-list-product-result-auction',
  templateUrl: './list-product-result-auction.component.html',
  styleUrls: ['./list-product-result-auction.component.css']
})
export class ListProductResultAuctionComponent implements OnInit {

  constructor(private listProductService: ListProductAuctionService,
              private dialog: MatDialog) {
  }

  public listProduct = [];
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
    const changeBySecond = interval(60000).subscribe(() => {
      this.listProductService.showAllProductResultAuction(this.category).subscribe((data) => {
        this.listProduct = data;
        this.checkListProduct = this.listProduct.length !== 0;
        if (this.checkListProduct === false){
          this.dialog.closeAll();
        }
      });
    });
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
}

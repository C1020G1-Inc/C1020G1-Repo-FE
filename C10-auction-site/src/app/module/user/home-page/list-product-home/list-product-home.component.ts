import { Component, OnInit } from '@angular/core';
import {ListProductAuctionService} from './list-product-auction.service';


@Component({
  selector: 'app-list-product-home',
  templateUrl: './list-product-home.component.html',
  styleUrls: ['./list-product-home.component.css']
})
export class ListProductHomeComponent implements OnInit {

  constructor(private listProductAuctionService: ListProductAuctionService) {
  }

  public listProduct: [];
  public page = 1;
  public activeOne = 'active';
  public activeTwo;
  public activeThree;
  public activeFour;
  public activeFive;
  public category = 0;
  ngOnInit(): void {
    this.listProductAuctionService.showAllProductAuction(this.category).subscribe((data) => {
      this.listProduct = data;
    });
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

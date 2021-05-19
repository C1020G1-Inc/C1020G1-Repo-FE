import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {interval} from 'rxjs';
import {LoadingComponent} from '../../../../loading/loading/loading.component';
import {ListProductAuctionService} from '../../../../../service/product/list-product-auction.service';
import {ProductImage} from '../../../../../model/ProductImage';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-result-search-product-auction',
  templateUrl: './result-search-product-auction.component.html',
  styleUrls: ['./result-search-product-auction.component.css']
})
export class ResultSearchProductAuctionComponent implements OnInit {
  public messageErrorSearch = '';
  public marginBottom = 'mb-5';
  public checkValidate = false;
  constructor(private listProductService: ListProductAuctionService,
              private cdref: ChangeDetectorRef,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
  }
  public listProduct = new Array<ProductImage>();
  public page = 1;
  public checkListProduct;
  public searchList;
  public categoryList;
  public priceList;
  formSearch = new FormGroup({
    keySearch: new FormControl(this.route.snapshot.queryParamMap.get('keySearch'), [Validators.required, Validators.pattern(/^([\p{Lu}]|[\p{Ll}])+(\s([\p{Lu}]|[\p{Ll}])+)*$/u), Validators.maxLength(64)]),
    category: new FormControl(this.route.snapshot.queryParamMap.get('category'), [Validators.required]),
    priceRange: new FormControl(this.route.snapshot.queryParamMap.get('price'), [Validators.required])
  });
  ngOnInit(): void {
    this.openLoading();
    this.searchList = this.formSearch.value.keySearch;
    this.categoryList = this.formSearch.value.category;
    this.priceList = this.formSearch.value.priceRange;
    console.log(this.searchList + this.priceList + this.categoryList);
    const changeBySecond = interval(1000).subscribe(() => {
      this.listProductService.searchProductAuction(this.searchList,
        this.categoryList, this.priceList).subscribe((data) => {
        this.listProduct = data;
        this.checkListProduct = this.listProduct.length !== 0;
        if (this.checkListProduct === false) {
          this.dialog.closeAll();
        }
      });
    });
  }
  search() {
    if (this.formSearch.valid) {
      this.router.navigate(['home/search/result'], {
        queryParams: {
          price: this.formSearch.value.priceRange,
          keySearch: this.formSearch.value.keySearch,
          category: this.formSearch.value.category,
        }
      });
      this.ngOnInit();
    } else {
      this.checkValidate = true;
    }
  }
  get keySearch() {
    return this.formSearch.get('keySearch');
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
    }, 1800);
  }
  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
  checkForm() {
    this.checkValidate = false;
  }
}

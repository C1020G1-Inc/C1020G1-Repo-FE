import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListProductAuctionService} from '../list-product-auction.service';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {interval} from 'rxjs';
import {LoadingComponent} from '../../../../loading/loading/loading.component';

@Component({
  selector: 'app-result-search-product-auction',
  templateUrl: './result-search-product-auction.component.html',
  styleUrls: ['./result-search-product-auction.component.css']
})
export class ResultSearchProductAuctionComponent implements OnInit {

  public messageErrorSearch = '';
  public marginBottom = 'mb-5';

  constructor(private listProductService: ListProductAuctionService,
              private cdref: ChangeDetectorRef,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
  }

  public listProduct: [];
  public page = 1;
  public activeOne = 'active';
  public activeTwo;
  public activeThree;
  public activeFour;
  public activeFive;
  public checkListProduct;
  formSearch = new FormGroup({
    keySearch: new FormControl(this.route.snapshot.queryParamMap.get('keySearch'), [Validators.required, Validators.pattern('(\\w+)(( )(\\w+))*')]),
    category: new FormControl(this.route.snapshot.queryParamMap.get('category'), [Validators.required]),
    priceRange: new FormControl(this.route.snapshot.queryParamMap.get('price'), [Validators.required])
  });

  ngOnInit(): void {
    this.openLoading();
    const changeBySecond = interval(1000).subscribe(() => {
      this.listProductService.searchProductAuction(this.formSearch.value.keySearch,
        this.formSearch.value.category, this.formSearch.value.priceRange).subscribe((data) => {
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
      this.router.navigate(['search/result'], {
        queryParams: {
          price: this.formSearch.value.priceRange,
          keySearch: this.formSearch.value.keySearch,
          category: this.formSearch.value.category,
        }
      });
      this.ngOnInit();
    }
  }

  get keySearch() {
    return this.formSearch.get('keySearch');
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

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}

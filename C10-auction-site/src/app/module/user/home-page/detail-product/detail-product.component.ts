import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/Product';
import {ActivatedRoute} from '@angular/router';
import {Auction} from '../../../../model/Auction';
import {ProductImage} from '../../../../model/ProductImage';
import {formatDate} from '@angular/common';
import {ProductService} from '../../../../service/product/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  public product: Product;
  public auction: Auction[];
  public  productImage: ProductImage[] ;
  p = 1;

  today = new Date();
  todaysDataTime = '' ;

  constructor(
    public productService: ProductService ,
    private activatedRoute: ActivatedRoute,
  ) {this.todaysDataTime = formatDate(this.today , 'dd/MM/yyyy hh:mm:ss a' , 'en-US' , '+0700');
  }

  // tslint:disable-next-line:use-lifecycle-interface
  // ngAfterContentChecked() {
  //   this.cdref.detectChanges();
  // }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.findProductById(id).subscribe(data => {
      this.product = data ;
    });
    this.productService.findAuctionById(id).subscribe(data1 => {
      this.auction = data1 ;
    });
    this.productService.findProductImageById(id).subscribe(data2 => {
      this.productImage = data2 ;
      console.log(data2);
    });

  }

  // getTimeRemain(date) {
  //   return ((new Date(date).getTime() - new Date().getTime()) / 1000) % 86400;
  // }
  // getDayRemain(date) {
  //   const day = Math.floor(((new Date(date).getTime() - new Date().getTime()) / 1000) / 86400);
  //   if (day > 0) {
  //     return day + ' N ';
  //   } else {
  //     return '';
  //   }
  // }
}

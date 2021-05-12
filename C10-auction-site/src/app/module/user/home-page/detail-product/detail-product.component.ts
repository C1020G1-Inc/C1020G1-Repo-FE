import { Component, OnInit } from '@angular/core';
import {Product} from '../../model/Product';
import {ProductService} from '../../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import {Auction} from '../../model/Auction';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  public product: Product;
  public auction: Auction[];
  constructor(
    public productService: ProductService ,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.productService.findProductById(id).subscribe(data => {
      this.product = data ;
    });
    this.productService.findAuctionById(id).subscribe(data1 => {
      this.auction = data1 ;
    });
  }

}

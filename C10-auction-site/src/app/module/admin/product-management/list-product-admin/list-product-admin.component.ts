import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/product/product';
import {ProductService} from '../../../../service/product.service';

@Component({
  selector: 'app-list-product-admin',
  templateUrl: './list-product-admin.component.html',
  styleUrls: ['./list-product-admin.component.css']
})
export class ListProductAdminComponent implements OnInit {

  productList: Product[];
  product: Product;
  productName: string;
  userName: string;
  productStatusId: number;
  categoryId: number;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe(data => {
      this.productList = data;
    });
  }

  approveProduct() {
    this.productService.approvedProduct(this.product.productId).subscribe( data => this.ngOnInit());
  }

  sendProduct(product: Product) {
    this.product = product;
  }

  doSearch() {
    if (this.categoryId === undefined) {
      this.categoryId = 0;
    }
    if (this.productStatusId === undefined) {
      this.productStatusId = 0;
    }
    this.productService.getProductBySearch(this.productName,
      this.categoryId, this.userName, this.productStatusId).subscribe(data => {
      this.productList = data;
      console.log(data);
    });
  }
}

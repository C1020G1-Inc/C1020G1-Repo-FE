import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../model/product/product';
import {ProductService} from '../../../../service/product.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Category} from '../../../../model/product/category';

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
  page;
  productEdit: Product;
  categoryList: Category[];

  editForm: FormGroup;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.productService.getAllCategory().subscribe(data => this.categoryList = data);
    this.editForm = this.formBuilder.group({
      productId: [''],
      productName: [''],
      category: [''],
      price: [''],
      priceStep: [''],
      account: [''],
      productStatus: [''],
      auctionTime: [''],
    });
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

  sendProductId(productId: number) {
    this.productService.getProductById(productId).subscribe( data => {
      this.productEdit = data;
      this.editForm.controls.productId.setValue(this.productEdit.productId);
      this.editForm.controls.productName.setValue(this.productEdit.productName);
      this.editForm.controls.category.setValue(this.productEdit.category.categoryName);
      this.editForm.controls.price.setValue(this.productEdit.price);
      this.editForm.controls.priceStep.setValue(this.productEdit.priceStep);
      this.editForm.controls.account.setValue(this.productEdit.account.user.userName);
      this.editForm.controls.auctionTime.setValue(this.productEdit.auctionTime);
    });
  }


}

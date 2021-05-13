import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProfileService} from '../profile.service';
import {ProductRegister} from '../../../../model/ProductRegister';

@Component({
  selector: 'app-history-register-product',
  templateUrl: './history-register-product.component.html',
  styleUrls: ['./history-register-product.component.css']
})
export class HistoryRegisterProductComponent implements OnInit {
  public productRegister: ProductRegister[];
  public product: ProductRegister;

  data;
  public pageNumber = 0;
  constructor(
    private profileService: ProfileService,
  ) { }

  getAllProductRegister(){
      this.profileService.getAllProductRegister(1, this.pageNumber).subscribe(data1 => {
        const listProduct = data1.content;
        this.data = data1;
        if (this.productRegister != null){
          this.productRegister = this.productRegister.concat(listProduct);
        }else{
          this.productRegister = listProduct;
        }
      });
    }

  ngOnInit(): void {
    this.productRegister = null;
    this.getAllProductRegister();
  }
  loadMoreProduct() {
    this.pageNumber++;
    this.getAllProductRegister();
  }

  setStatus() {
    this.profileService.setStatusProduct(this.product.productId).subscribe(() => this.ngOnInit());
  }

  setProductRegister(){
    this.profileService.setProduct(this.product.price, this.product.description , this.product.productId).subscribe(() => this.ngOnInit());
  }
}

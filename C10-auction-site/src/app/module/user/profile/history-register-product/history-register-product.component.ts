import {Component, OnInit} from '@angular/core';
import {ProfileService} from '../profile.service';
import {ProductRegister} from '../../../../model/ProductRegister';
import {TokenStorageService} from '../../../../service/authentication/token-storage';
import {Account} from '../../../../model/account';
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-history-register-product',
  templateUrl: './history-register-product.component.html',
  styleUrls: ['./history-register-product.component.css']
})
export class HistoryRegisterProductComponent implements OnInit {
  public productRegister: ProductRegister[];
  statusChange = {
    1: 'Chờ Duyệt',
    2: 'Đang Đấu Giá',
    3: 'Chờ Thanh Toán',
    4: 'Hoàn Thành',
    5: 'Thất Bại',
    6: 'Hủy đăng ký'
  };
  public product: ProductRegister;
  formRePost: FormGroup;
  data;
  public pageNumber = 0;
  account: Account
  constructor(
    private profileService: ProfileService,
    private tokenStorage: TokenStorageService
  ) {
  }
  ngOnInit(): void {
    this.productRegister = null;
    this.account = this.tokenStorage.getAccount();
    this.getAllProductRegister();
    this.formRePost = new FormGroup({
      description : new FormControl("",[Validators.required]),
      price: new FormControl(0, [Validators.required,Validators.min(0),Validators.pattern('[0-9]+')])
    });
  }
  get description() {
    return this.formRePost.get('description');
  }
  get price() {
    return this.formRePost.get('price');
  }
  openModal(product: ProductRegister){
    this.product = product;
    this.description.setValue(this.product.description);
    this.price.setValue(this.product.price);
  }
  getAllProductRegister() {
    this.profileService.getAllProductRegister(this.account.accountId, this.pageNumber).subscribe(data1 => {
      const listProduct = data1.content;
      console.log(data1.content)
      this.data = data1;
      if (this.productRegister != null) {
        this.productRegister = this.productRegister.concat(listProduct);
      } else {
        this.productRegister = listProduct;
      }
    });
  }
  loadMoreProduct() {
    this.pageNumber++;
    this.getAllProductRegister();
  }
  setStatus() {
    this.pageNumber = 0;
    this.profileService.setStatusProduct(this.product.productId).subscribe(() => this.ngOnInit());
  }
  setProductRegister() {
    this.pageNumber = 0;
    this.product.description = this.description.value.trim();
    this.product.price = this.price.value;
    this.profileService.setProduct(this.product).subscribe(() => {
      this.ngOnInit();
      $('#close').click();
    });
  }
  // searchProductRegister() {
  //   this.profileService.searchProductRegister(this.product.productName,
  //     this.product.registerTime, this.product.price).subscribe(() => this.ngOnInit());
  // }
}

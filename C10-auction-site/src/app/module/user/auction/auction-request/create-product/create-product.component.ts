import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Image} from '../Image';
import {CreateServiceService} from '../create-service.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  title = 'Đăng sản phẩm';
  public createProduct: FormGroup;

  public image: Image;
  public category: any;
  private activatedRoute: ActivatedRoute;
  private createService: CreateServiceService;


  constructor() {
  }

  ngOnInit(): void {
    this.createProduct = new FormGroup({
      name: new FormControl(''),
      type: new FormControl(''),
      quantity: new FormControl(''),
      price: new FormControl(''),
      priceStep: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      status: new FormControl(''),
      accountId: new FormControl(''),
      registerTime: new FormControl('')
    });

    this.category = this.getCategory();
  }

  getCategory() {
    this.createService.getCategory().subscribe(category => {
      this.category = category;
    });
  }


  submit() {
    this.createService.createProduct(this.createProduct.value).subscribe(data => {
      console.log(data);
    });

  }
}

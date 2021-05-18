import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CreateServiceService} from '../create-service.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Product} from '../Product';
import {Status} from '../Status';
import {Accounts} from '../Account';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  title = 'Đăng sản phẩm';
  public createProduct: FormGroup;
  public category: any;



  constructor(
    private createService: CreateServiceService,
  ) {
  }

  ngOnInit(): void {
    this.createProduct = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(1)]),
      price: new FormControl('', [Validators.required, Validators.min(1000)]),
      priceStep: new FormControl('', [Validators.required, Validators.min(1000)]),
      description: new FormControl('', [Validators.required]),
      registerTime: new FormControl(''),
      auctionTime: new FormControl('', [Validators.required]),
    });

    this.getCategory();


  }

  getCategory() {
    this.createService.getCategory().subscribe(category => {
      this.category = category;
    });
  }

  submit(createProduct: FormGroup) {
    this.createService.createProduct(this.createProduct.value).subscribe(data => {
    })

  }
}

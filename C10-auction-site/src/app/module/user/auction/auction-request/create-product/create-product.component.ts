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
    // private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.createProduct = new FormGroup({
      name: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      priceStep: new FormControl('', [Validators.required]),
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


  submit() {

    // let product: Product = new Product(createProduct.value.name, createProduct.value.type, createProduct.value.quantity, createProduct.value.price,
    //   createProduct.value.priceStep, createProduct.value.description, createProduct.value.status = new Status(1)
    //   , createProduct.value.accountId = new Accounts(1), createProduct.value.registerTime = new Date());
    //
    // console.log("Product value : "+JSON.stringify(product));
    // console.log("Product before: "+product.productName);

    console.log(this.createProduct.value);
    this.createService.createProduct(this.createProduct.value).subscribe(data => {

      console.log();
    }, error => {
      console.log("Error");
    })

  }
}

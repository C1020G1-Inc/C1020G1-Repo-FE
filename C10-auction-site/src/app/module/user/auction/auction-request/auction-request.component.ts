import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from '../../../../service/request.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auction-request',
  templateUrl: './auction-request.component.html',
  styleUrls: ['./auction-request.component.css']
})
export class AuctionRequestComponent implements OnInit {

  public createProduct: FormGroup;
  public category: any;
  constructor(
    private createService: RequestService,
    private router: Router
  ) {
  }
  ngOnInit(): void {
    this.createProduct = new FormGroup({
      productName: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required, Validators.min(1), Validators.max(999)]),
      price: new FormControl('', [Validators.required, Validators.min(1000),Validators.max(999999999)]),
      priceStep: new FormControl('', [Validators.required, Validators.min(1000), Validators.max(99999999)]),
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
    this.router.navigateByUrl('/home');
  }

}

import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-form-search-product-auction',
  templateUrl: './form-search-product-auction.component.html',
  styleUrls: ['./form-search-product-auction.component.css']
})
export class FormSearchProductAuctionComponent implements OnInit {
  public messageErrorSearch = '';
  public marginBottom = 'mb-5';
  constructor(private router: Router) {
  }
  public formSearch: FormGroup;
  public checkValidate = false;
  ngOnInit(): void {
    this.formSearch = new FormGroup({
      keySearch: new FormControl('', [Validators.required, Validators.pattern(/^([\p{Lu}]|[\p{Ll}])+(\s([\p{Lu}]|[\p{Ll}])+)*$/u), Validators.maxLength(64)]),
      category: new FormControl(0, [Validators.required]),
      priceRange: new FormControl(0, [Validators.required])
    });
  }
  search() {
    if (this.formSearch.valid) {
      this.router.navigate(['home/search/result'], {
        queryParams: {
          price: this.formSearch.value.priceRange,
          keySearch: this.formSearch.value.keySearch,
          category: this.formSearch.value.category,
        }
      });
    }else {
      this.checkValidate = true;
    }
  }
  get keySearch() {
    return this.formSearch.get('keySearch');
  }
  checkForm() {
    this.checkValidate = false;
  }
}

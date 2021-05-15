import {Component, OnInit} from '@angular/core';
import {TransactionDTO} from '../../../../model/auction-bidding.model';
import {AuctionBackendService} from '../../../../service/auction-bidding/auction-backend.service';
import {mergeMap} from 'rxjs/operators';
import {FirebaseDatabaseService} from '../../../../service/auction-bidding/firebase-database.service';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../../../service/authentication/token-storage';

@Component({
  selector: 'app-auction-cart',
  templateUrl: './auction-cart.component.html',
  styleUrls: ['./auction-cart.component.css']
})
export class AuctionCartComponent implements OnInit {

  public accountId: number;
  public listTransaction: Array<TransactionDTO>;
  public endTime;
  public formChooseProduct = new FormArray([], this.atLeastOneCheckboxValidator());

  constructor(public auctionBackendService: AuctionBackendService,
              public firebaseDatabaseService: FirebaseDatabaseService,
              public tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.auctionBackendService.getListTransaction().subscribe(data => {
      if (data != null) {
        this.listTransaction = data;
      }
    });

    this.accountId = this.tokenStorageService.getAccount().accountId;

    this.firebaseDatabaseService.getNotifyByAccount(this.accountId)
      .pipe(mergeMap(() => this.auctionBackendService.getListTransaction()))
      .subscribe(data => {
        if (data != null) {
          this.listTransaction = data;
          this.listTransaction.map(t => t.transactionTime = new Date(new Date(t.transactionTime).getTime() + 10 * 60 * 1000));
        }
      });
  }

  atLeastOneCheckboxValidator() {
    return (formGroup: FormGroup) => {
      if (formGroup.value.length < 1) {
        return {requireCheckboxToBeChecked: true};
      }
      return null;
    };
  }

  checkArray(id: number, array) {
    for (const item of array) {
      if (item === id) {
        return true;
      }
    }
    return false;
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.formChooseProduct;
    checkArray.markAsTouched();

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.formChooseProduct);
  }

  getProductByTransactionId(transactionId): TransactionDTO {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listTransaction.length; i++) {
      if (this.listTransaction[i].transactionId === +transactionId) {
        return this.listTransaction[i];
      }
    }
    return null;
  }

  getTotal() {
    let total = 0;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.formChooseProduct.value.length; i++) {
      total += this.getProductByTransactionId(this.formChooseProduct.value[i]).detailProductDTO.price * 1.05;
    }
    return total;
  }
}

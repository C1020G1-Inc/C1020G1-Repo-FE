import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../../../service/transaction.service';
import {Title} from "@angular/platform-browser";
@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit {
  public listTransaction = [];
  public transactionId: number;
  public namePost: string;
  public nameBuy: string;
  public productName: string;
  public price: number;
  public status: string;
  page;
  constructor(
    private transactionService: TransactionService,
    private title: Title
  ) { }
  ngOnInit(): void {
    this.title.setTitle('Quản lý giao dịch');
    this.transactionService.getAllTransaction().subscribe(data => {
      this.listTransaction = data;
      console.log(this.listTransaction);
    });
  }
  showDelete(transactionId: number) {
    this.transactionId = transactionId;
  }
  delete() {
    this.transactionService.deleteTransaction(this.transactionId).subscribe( data => {
      this.ngOnInit();
    });
  }
  search() {
    if (this.price === undefined){
      this.price = 0;
    }
    // tslint:disable-next-line:max-line-length
    this.transactionService.getTransactionBySearch(this.namePost, this.nameBuy, this.productName, this.price, this.status).subscribe(data => {
      this.listTransaction = data;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import {TransactionService} from '../../../../service/transaction.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list-transaction',
  templateUrl: './list-transaction.component.html',
  styleUrls: ['./list-transaction.component.css']
})
export class ListTransactionComponent implements OnInit {

  public listTransaction;
  public transactionId: number;
  public namePost: string;
  public nameBuy: string;
  public productName: string;
  public price: number;
  public status: string;

  constructor(
    private transactionService: TransactionService,
    private router: Router
    ) { }

  ngOnInit(): void {
      this.transactionService.getAllTransaction().subscribe(data => {
        this.listTransaction = data.content;
        console.log(this.listTransaction);
      });
  }

  showDelete(transactionId: number) {
    this.transactionId = transactionId;
    console.log(this.transactionId);
  }

  delete() {
      this.transactionService.deleteTransaction(this.transactionId).subscribe( data => {
         this.ngOnInit();
      });
  }

  seach() {
    if (this.price === undefined){
      this.price = 0;
    }
    // tslint:disable-next-line:max-line-length
    this.transactionService.getTransactionBySearch(this.namePost, this.nameBuy, this.productName, this.price, this.status).subscribe(data => {
        this.listTransaction = data;
    });
  }
}

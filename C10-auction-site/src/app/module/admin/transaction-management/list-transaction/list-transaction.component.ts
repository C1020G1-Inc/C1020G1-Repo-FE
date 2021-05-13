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
}

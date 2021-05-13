import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTransactionComponent } from './list-transaction/list-transaction.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [ListTransactionComponent],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class TransactionManagementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTransactionComponent } from './list-transaction/list-transaction.component';
import {FormsModule} from "@angular/forms";
import {NgxPaginationModule} from "ngx-pagination";
import {LeftSideBarModule} from '../left-side-bar/left-side-bar.module';



@NgModule({
  declarations: [ListTransactionComponent],
    imports: [
        CommonModule,
        FormsModule,
        NgxPaginationModule,
        LeftSideBarModule
    ]
})
export class TransactionManagementModule { }

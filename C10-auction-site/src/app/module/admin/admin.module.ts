import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementModule } from './user-management/user-management.module';
import { ProductManagementModule } from './product-management/product-management.module';
import { TransactionManagementModule } from './transaction-management/transaction-management.module';
import { AdminChatModule } from './admin-chat/admin-chat.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserManagementModule,
    ProductManagementModule,
    TransactionManagementModule,
    AdminChatModule,
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { LockUserComponent } from './lock-user/lock-user.component';
import { UserChartComponent } from './user-chart/user-chart.component';
import {FormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import {NgxPaginationModule} from "ngx-pagination";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [ListUserComponent, LockUserComponent, UserChartComponent],
    exports: [
        ListUserComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    NgxPaginationModule,
    RouterModule
  ]
})
export class UserManagementModule { }

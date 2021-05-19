import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { UserChartComponent } from './user-chart/user-chart.component';
import {FormsModule} from '@angular/forms';
import {ChartsModule} from 'ng2-charts';
import {NgxPaginationModule} from 'ngx-pagination';
import {RouterModule} from '@angular/router';
import {LeftSideBarModule} from '../left-side-bar/left-side-bar.module';



@NgModule({
    declarations: [ListUserComponent, UserChartComponent],
    exports: [
        UserChartComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    NgxPaginationModule,
    RouterModule,
    LeftSideBarModule
  ]
})
export class UserManagementModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user/list-user.component';
import { LockUserComponent } from './lock-user/lock-user.component';
import { UserChartComponent } from './user-chart/user-chart.component';



@NgModule({
  declarations: [ListUserComponent, LockUserComponent, UserChartComponent],
  imports: [
    CommonModule
  ]
})
export class UserManagementModule { }

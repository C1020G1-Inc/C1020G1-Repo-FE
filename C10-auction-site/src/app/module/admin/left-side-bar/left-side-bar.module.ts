import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LeftSideBarComponent} from './left-side-bar.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [LeftSideBarComponent],
  exports:[
    LeftSideBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LeftSideBarModule { }

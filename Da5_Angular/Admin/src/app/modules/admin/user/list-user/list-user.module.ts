import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUserComponent } from './list-user.component';
import { FormsModule } from '@angular/forms';

const router:Routes = [
  {
    path:'',
    component:ListUserComponent,
    pathMatch:'full'
  }
]

@NgModule({
  declarations: [
    ListUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule
  ]
})
export class ListUserModule { }

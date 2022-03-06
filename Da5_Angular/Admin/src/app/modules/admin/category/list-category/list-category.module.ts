import { AddCatgoryComponent } from './../add-catgory/add-catgory.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListCategoryComponent } from './list-category.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const router:Routes = [
  {
    path:'',
    component:ListCategoryComponent,
    pathMatch:'full'
  },
  {
    path:'addCategory',
    component:AddCatgoryComponent,
    pathMatch:'full'
  }
]
@NgModule({
  declarations: [
    ListCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule
  ]
})
export class ListCategoryModule { }

import { ListCategoryComponent } from './list-category/list-category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { AddCatgoryComponent } from './add-catgory/add-catgory.component';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const router:Routes = [
  {
    path:'',
    component:CategoryComponent,
    children:[
      {
        path:'',
        redirectTo:'index'
      },
      {
        path:'index',
        loadChildren:()=>import('./list-category/list-category.module').then(x=>x.ListCategoryModule)
      },
      {
        path:'edit/:id',
        component:AddCatgoryComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    CategoryComponent,
    AddCatgoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoryModule { }

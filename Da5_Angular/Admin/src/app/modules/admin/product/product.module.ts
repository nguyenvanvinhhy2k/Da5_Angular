import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductComponent } from './product.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
const router:Routes = [
  {
    path:'',
    component:ProductComponent,
    children:[
      {
        path:'',
        redirectTo:'list'
      }
      ,
      {
        path:'list',
        loadChildren:()=>import('./product-list/product-list.module').then(x=>x.ProductListModule)
      },
      {
        path:'add-product',
        component:AddProductComponent
      },
      {
        path:'edit-product/:id',
        component:AddProductComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    ProductListComponent,
    AddProductComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';

const router:Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'',
        redirectTo:'home'
      }
      ,
      {
        path:'home',
        loadChildren:()=>import('./dashboard/dashboard.module').then(x=>x.DashboardModule)
      },
      {
        path:'product',
        loadChildren:()=>import('./product/product.module').then(x=>x.ProductModule)
      },
      {
        path:'category',
        loadChildren:()=>import('./category/category.module').then(x=>x.CategoryModule)
      },
      {
        path:'user',
        loadChildren:()=>import('./user/user.module').then(x=>x.UserModule)
      },
      {
        path:'order',
        loadChildren:()=>import('./order/order.module').then(x=>x.OrderModule)
      }
    ]
  },
  {
    path:'login',
    loadChildren:()=>import('./login/login.module').then(x=>x.LoginModule)
  }
]

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(router),
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }

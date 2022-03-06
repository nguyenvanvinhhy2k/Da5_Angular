import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { OrdersuccessComponent } from './ordersuccess/ordersuccess.component';

const router:Routes =[
  {
    path:'',
    component:OrderComponent,
    children:[
      {
        path:'',
        redirectTo:'index',
        pathMatch:'full'
      },
      {
        path:'index',
        loadChildren:()=>import('./list-order/list-order.module').then(x=>x.ListOrderModule)
      },
      {
        path:'orderdetail/:id',
        component:OrderDetailComponent,
        pathMatch:'full'
      },
      {
        path:'orderSuccess',
        component:OrdersuccessComponent,
        pathMatch:'full'
      }
    ]
  }
] 

@NgModule({
  declarations: [
    OrderComponent,
    OrderDetailComponent,
    OrdersuccessComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderModule { }

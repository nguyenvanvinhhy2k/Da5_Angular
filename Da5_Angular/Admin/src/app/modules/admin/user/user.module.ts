import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

const router:Routes = [
  {
    path:'',
    component:UserComponent,
    children:[
      {
        path:'',
        redirectTo:'index'
      },
      {
        path:'index',
        loadChildren:()=>import('./list-user/list-user.module').then(x=>x.ListUserModule)
      },
      {
        path:'addUser',
        component:AddUserComponent,
        pathMatch:'full'
      }
      ,{
        path:'edit/:id',
        component:AddUserComponent,
        pathMatch:'full'
      }
    ]
  }
]

@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }

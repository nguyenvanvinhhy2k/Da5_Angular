import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from 'src/app/shared/service/auth.service';

const router:Routes = [
  {
    path:'',
    component:DashboardComponent,
    pathMatch:'full',
    canActivate:[AuthService]
  }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ]
})
export class DashboardModule { }

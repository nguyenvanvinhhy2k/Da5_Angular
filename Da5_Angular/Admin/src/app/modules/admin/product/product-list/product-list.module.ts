import { ProductListComponent } from './product-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap' ;

const router:Routes = [
  {
    path:'',
    component:ProductListComponent,
    pathMatch:'full'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(router),
    NgbModule
  ]
})
export class ProductListModule { }

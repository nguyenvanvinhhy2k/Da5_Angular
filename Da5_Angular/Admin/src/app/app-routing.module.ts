import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

const routes: Routes = [
  {
    path:'',
    redirectTo:'admin',
    pathMatch:'full'
  },
  {
    path:'admin',
    loadChildren:()=>import('./modules/admin/admin.module').then(x=>x.AdminModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './product/product.component';
import {AdminComponent} from '../admin/admin.component';
import { QuanlylienheComponent } from './quanlylienhe/quanlylienhe.component';
import {StoreManagerComponent} from './store-manager/store-manager.component';
const routes: Routes = [
  {path: '', redirectTo: 'store-manager', pathMatch: 'full' },
  {path: 'store-manager',component:StoreManagerComponent,},
  {
    path:'manager',
    component:AdminComponent,
    children:[
      {
      }
    ]
  }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

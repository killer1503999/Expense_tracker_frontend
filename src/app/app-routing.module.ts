import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './product/product.component'
import {FactoryComponent} from "./factory/factory.component"
import{ProductdetailShowComponent} from "./product/productdetail-show/productdetail-show.component";
const routes: Routes = [
  { path: 'factory', component: FactoryComponent },
  { path: 'factory/product', component: ProductComponent },
  { path: 'factory/product/productlist', component: ProductdetailShowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

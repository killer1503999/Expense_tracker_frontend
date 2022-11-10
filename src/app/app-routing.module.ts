import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './product/product.component'
import {FactoryComponent} from "./factory/factory.component"
import{ProductdetailShowComponent} from "./product/productdetail-show/productdetail-show.component";
import {AprroveraddeditComponent} from "./approvers/aprroveraddedit/aprroveraddedit.component";
import {ApproversComponent} from "./approvers/approvers.component"
const routes: Routes = [
  { path: 'user', component: FactoryComponent },
  { path: 'approvers', component: FactoryComponent },
  { path: 'approvers/AcceptorReject', component: ApproversComponent },
  { path: 'approvers/AcceptorReject/Check', component: AprroveraddeditComponent },
  { path: 'user/expense', component: ProductComponent },
  { path: 'user/expense/expensedetail', component: ProductdetailShowComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

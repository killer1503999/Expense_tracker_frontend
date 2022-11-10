import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FactoryComponent } from './factory/factory.component';
import { ProductComponent } from './product/product.component';
import { ShowEditComponent } from './factory/show-edit/show-edit.component';
import { AddEditComponent } from './product/add-edit/add-edit.component';
import {SharedService } from './shared.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AddEditFactoryComponent } from './factory/add-edit-factory/add-edit-factory.component';
import { ProductShowEditComponent } from './product/product-show-edit/product-show-edit.component';
import { ProductdetailShowComponent } from './product/productdetail-show/productdetail-show.component';
import { ApproversComponent } from './approvers/approvers.component';
import { AprroveraddeditComponent } from './approvers/aprroveraddedit/aprroveraddedit.component';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule } from "ngx-ui-loader";
@NgModule({
  declarations: [
    AppComponent,
    FactoryComponent,
    ProductComponent,
    ShowEditComponent,
    AddEditComponent,
    AddEditFactoryComponent,
    ProductShowEditComponent,
    ProductdetailShowComponent,
    ApproversComponent,
    AprroveraddeditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

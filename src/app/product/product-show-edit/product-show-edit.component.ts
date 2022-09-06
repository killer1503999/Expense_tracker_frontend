import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-product-show-edit',
  templateUrl: './product-show-edit.component.html',
  styleUrls: ['./product-show-edit.component.css']
})
export class ProductShowEditComponent implements OnInit {

  message: any
  ProductList: any=[];

  Modaltitle: string;
  ActivateAddEditProductDetails:boolean = false;
  dep:any;

  constructor(private services:SharedService) { }

  ngOnInit(): void {
    this.message=this.services.getMessage();
    this.refreshProductList(this.message.id);
    // console.log(this.message);
    
  }

  refreshProductList(messaage) {
    this.services.getProductList(messaage).subscribe(data => {
      this.ProductList=data["message"];
      // console.log(this.ProductList);
    })
  }
  sendMessage(messsage){
    this.services.sendMessage(messsage);
 }

 addClick(){
  this.dep={
    id:0,
    quantity:0,
    productsName:"",
    description:"",
    image:File,
    factoryName:this.message.id
  }
  this.Modaltitle="Add Product";
  this.ActivateAddEditProductDetails = true;

 }
 closeClick(){
  this.ActivateAddEditProductDetails=false;
  this.refreshProductList(this.message.id);
 }
editClick(productDetails){
  this.dep=productDetails;
  this.Modaltitle="Edit Product Details";
  this.ActivateAddEditProductDetails=true;
  this.refreshProductList(this.message.id);
}

deleteClick(item){
  if(confirm('Are you sure??')){
    this.services.deleteProductDetails(this.message.id,item.id).subscribe(data=>{
      alert("Done!".toString());
      this.refreshProductList(this.message.id);
    })
  }
}
Expand(productDetails){
  this.dep=productDetails;
  this.Modaltitle="Description of Product";
  this.ActivateAddEditProductDetails=true;
}

}

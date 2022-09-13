import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {HttpClient} from '@angular/common/http';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-productdetail-show',
  templateUrl: './productdetail-show.component.html',
  styleUrls: ['./productdetail-show.component.css']
})
export class ProductdetailShowComponent implements OnInit {

  constructor(private services:SharedService,private http:HttpClient) { }
  message: any
  ProductList=[];
  Images:string;
  file_name:String;

  ngOnInit(): void {
    this.message = this.services.getMessage();
    this.refreshProductList(this.message[1].id, this.message[0].id);
    // console.log(this.message[1].id,this.message[0].id);
    // console.log(this.productDetails.image);
    // this.Images=this.services.PhotoUrl+this.productDetails.image;
 
  }
  
  refreshProductList(Factory_id,Product_id) {
    this.services.getProductDetails(Factory_id,Product_id).subscribe(data => {this.ProductList=data["message"]; 
    this.Images=this.services.PhotoUrl+this.ProductList[0]["image"];
    console.log(this.ProductList[0]["image"])

    // console.log(this.ProductList);
  })

   
  }
  onProductClick(){
    this.services.sendMessage(this.message[1]);
    console.log(this.message[1]);
  }
  download(){
    this.http.get(this.Images,{responseType: 'blob'}).subscribe((data:Blob | MediaSource) =>{
      let downloadURL = window.URL.createObjectURL(data)
      
      this.file_name=<String>(this.ProductList[0]["image"]);
      saveAs(downloadURL,this.file_name)
      console.log("downloadURL")
      console.log(window.URL.createObjectURL(data))
    })
    
  }
  

  // Images=this.services.PhotoUrl+this.productDetails.image;

}

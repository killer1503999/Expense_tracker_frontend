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
    this.refreshProductList(this.message[1].userId, this.message[0].id);
    
    // console.log(this.message[1].id,this.message[0].id);
    // console.log(this.productDetails.image);
    // this.Images=this.services.PhotoUrl+this.productDetails.image;
 
  }
  
  refreshProductList(Factory_id,Product_id) {
    this.services.getProductDetails(Factory_id,Product_id).subscribe(data => {this.ProductList=data["message"]; 
    console.log(this.ProductList);
    console.log(this.ProductList[0].approvedStatus);
    console.log(this.ConvertDateToStringFormat(this.ProductList[0].date));
    this.Images=this.services.PhotoUrl+this.ProductList[0]["recieptImage"];
    console.log(this.ProductList[0]["recieptImage"])

    // console.log(this.ProductList);
  })

   
  }
  checkDownload(){
      if (this.ProductList[0]["recieptImage"] != null){
            return false
      }
      else{
            return true
      }
  }
  onProductClick(){
    this.services.sendMessage(this.message[1]);
    console.log(this.message[1]);
  }
  download(){
    this.http.get(this.Images,{responseType: 'blob'}).subscribe((data:Blob | MediaSource) =>{
      let downloadURL = window.URL.createObjectURL(data)
      
      this.file_name=<String>(this.ProductList[0]["recieptImage"]);
      saveAs(downloadURL,this.file_name)
      console.log("downloadURL")
      console.log(window.URL.createObjectURL(data))
    })
    
  }
  ConvertDateToStringFormat(dt:Date):string{
      dt = new Date(dt);
      var day = ("0" + dt.getDate()).slice(-2);
      var month = ("0" + (dt.getMonth() + 1)).slice(-2);
      return dt.getFullYear() +"/"+ month +"/" + day;
  }
  

  // Images=this.services.PhotoUrl+this.productDetails.image;

}

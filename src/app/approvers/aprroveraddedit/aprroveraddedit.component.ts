import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
import {HttpClient} from '@angular/common/http';
import * as saveAs from 'file-saver';
@Component({
  selector: 'app-aprroveraddedit',
  templateUrl: './aprroveraddedit.component.html',
  styleUrls: ['./aprroveraddedit.component.css']
})
export class AprroveraddeditComponent implements OnInit {
      DepartmentList: any;

      constructor(private services:SharedService,private http:HttpClient) { }
      message: any
      ProductList=[];
      Images:string;
      file_name:String;
      Status="Pending";
      approversComments:String;
      userId :"";
      pending="Pending";

      DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];
    
      ngOnInit(): void {
        this.message = this.services.getMessage();
      //   this.refreshProductList(this.message[1].userId, this.message[0].id);
        this.refreshProductList(this.message[1].userId, this.message[0].id);
        console.log(this.Status)
        console.log(this.ProductList);
        
        // console.log(this.message[1].id,this.message[0].id);
        // console.log(this.productDetails.image);
        // this.Images=this.services.PhotoUrl+this.productDetails.image;
     
      }
      AcceptorReject(status){
            this.Status=status.target.value;
            console.log(this.Status)

      }
      AcceptorRejectcomment(status){
            this.approversComments=status.target.value;
            console.log(this.approversComments)

      }
      checkDownload(){
            if (this.ProductList[0]["recieptImage"] != null){
                  return false
            }
            else{
                  return true
            }
        }
      
      
      refreshProductList(Factory_id,Product_id) {
        this.services.getProductDetails(Factory_id,Product_id).subscribe(data => {this.ProductList=data["message"]; 
        
      //   console.log(this.ProductList[0].approvedStatus);
      //   console.log(this.ConvertDateToStringFormat(this.ProductList[0].date));
        this.Images=this.services.PhotoUrl+this.ProductList[0]["recieptImage"];
      //   console.log(this.ProductList[0]["recieptImage"])
    
        
      })
    
       
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
          return dt.getFullYear() +"-"+ month +"-" + day;
      }
      updateDepartment(){
            const fd=new FormData();
            fd.append("expenseCategory",this.ProductList[0]["expenseCategory"].toString());
            fd.append('date',this.ProductList[0]["date"].toString());
            fd.append("amount",this.ProductList[0]["amount"].toString());
            fd.append("comments",this.ProductList[0]["comments"].toString());
            fd.append('recieptImage','');
            fd.append('approvedStatus',this.Status);
            fd.append('userId',this.ProductList[0]["userDetail"].toString());
            fd.append('approversComments',this.approversComments.toString());
            console.log(this.approversComments);
      //       fd.append("amount",this.amount.toString());
      //   fd.append("expenseCategory",this.expenseCategory);
      //   fd.append("comments",this.comments);
      //   fd.append('recieptImage','');
      //   fd.append('date',this.date.toString());
      //   fd.append('userId',this.userId.toString());
                  // fd.append('image',this.selectedFile,this.selectedFile.name);
                  
          
                  // console.log(this.userId.toString());
                  if(confirm('Are you sure??')){
                    this.services.updateapproversAccessDetails(this.ProductList[0]["userDetail"],this.ProductList[0]["id"],fd).subscribe(res=>{
                      alert("Done!".toString());
                      });
                  }
                  
      }
      isDisabled(){
                  if (this.Status != "Pending"){
                        return false
                  }
                  else {
                        return true
                  }
      }
      
      
    
      // Images=this.services.PhotoUrl+this.productDetails.image;
    

}

// import { Component, OnInit } from '@angular/core';
import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import {HttpClient} from '@angular/common/http';
import * as saveAs from 'file-saver';
@Component({
  selector: 'app-approvers',
  templateUrl: './approvers.component.html',
  styleUrls: ['./approvers.component.css']
})
export class ApproversComponent implements OnInit {

  constructor(private services:SharedService,private http:HttpClient) { }
  @Input() dep:any;
  id:number;
  amount:0;
  expenseCategory:"";
  comments:"";
  recieptImage:File;
  date:Date;
  approvedStatus:"";
  approversComments:"";
  userId:number;
  productList=[];
  recieptImageUrl:string;
  file_name:String;
  message: any
  ProductList: any=[];
  ActivateAddEditProductDetails=false;
  checkemptyarray=[];
  test=true;

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];
  ngOnInit(): void {
      this.message=this.services.getMessage();
      // this.message.userId
      this.refreshProductList(this.message.userId);
      console.log()

    }

    refreshProductList(messaage) {
      this.services.getapproversAccessList(messaage).subscribe(data => {
        this.ProductList=data["message"];
        console.log(this.ProductList);
        console.log(this.ProductList.length == 0);
        if ( this.ProductList.length != 0){
            this.test= false
        }
        else{
            this.test=true
        }
      })
    }
    sendMessage(messsage){
      this.services.sendMessage(messsage);
   }
  updateDepartment(){
      const fd=new FormData();
      if (this.selectedFile!=null){
            fd.append("expenseCategory",this.expenseCategory);
            fd.append('date',this.date.toString());
            fd.append("amount",this.amount.toString());
            fd.append("comments",this.comments);
            fd.append('recieptImage',this.selectedFile);
            console.log(fd.getAll('image'));
            fd.append('userId',this.userId.toString());

        if(confirm('Are you sure??')){
          this.services.updateapproversAccessDetails(this.userId,this.id,fd).subscribe(res=>{
            alert("Done!".toString());
            });
        }
        this.services.getapproversAccessList(this.dep.userId)
      }
      if (this.selectedFile==null) {
        console.log(this.userId);
        fd.append("amount",this.amount.toString());
        fd.append("expenseCategory",this.expenseCategory);
        fd.append("comments",this.comments);
        fd.append('recieptImage','');
        fd.append('date',this.date.toString());
        fd.append('userId',this.userId.toString());
        // fd.append('image',this.selectedFile,this.selectedFile.name);


        console.log(this.userId.toString());
        if(confirm('Are you sure??')){
          this.services.updateapproversAccessDetails(this.userId,this.id,fd).subscribe(res=>{
            alert("Done!".toString());
            });
        }
        this.services.getapproversAccessList(this.dep.userId)
      }

    }
    selectedFile=null;

    onFileSelected(event) {
      this.selectedFile=<File>event.target.files[0];

      console.log(this.selectedFile);
      console.log(this.validateFile(this.selectedFile))

    }



    validateFile(selectedFile) {
      console.log(111111);
      // this.filesforcheck = event.target.files;
      let filecheckname=<String>(selectedFile.name);
      var ext = filecheckname.substring(filecheckname.lastIndexOf('.'));
      if (this.services.recieptImageformaturl.includes(ext.toLowerCase())) {
            console.log(filecheckname);
          return true;
      }
      else {
            console.log(this.services.recieptImageformaturl.includes(ext.toLowerCase()));
            console.log(ext.toLowerCase());
            console.log(this.services.recieptImageformaturl);
          return false;
      }
  }
  deleteClick(item){
      if(confirm('Are you sure??')){
        this.services.deleteProductDetails(this.message.userId,item.id).subscribe(data=>{
          alert("Done!".toString());
          this.refreshProductList(this.message.userId);
        })
      }
    }
    download(){
      console.log("this.recieptImageUrl");
      this.http.get(this.recieptImageUrl,{responseType: 'blob'}).subscribe((data:Blob | MediaSource) =>
      {let downloadURL = window.URL.createObjectURL(data)
      this.file_name=<String>(this.recieptImage.toString().substring(this.recieptImage.toString().lastIndexOf('/')+1));
      saveAs(downloadURL,this.file_name)}

      )
      // filecheckname.substring(filecheckname.lastIndexOf('.'))
      // console.log(typeof(this.recieptImage.toString()));
      // console.log(this.recieptImage.toString().substring(this.recieptImage.toString().lastIndexOf('/')+1));
    }

  isDisabled():boolean {
    if(this.amount <1 || this.expenseCategory =="" || this.comments == "" ) {
      return true
    }
    return false
//     || this.recieptImage==null || this.selectedFile==null || this.validateFile(this.selectedFile)==false
    }
    isDisabledup():boolean {

      if(this.amount <1 || this.expenseCategory =="" || this.comments == "" || this.validateFile(this.selectedFile)==false ) {
            console.log(this.amount,this.expenseCategory,this.comments,)
        return true

      }
      return false
      }

      ConvertDateToStringFormat(dt:Date):string{
            dt = new Date(dt);
            var day = ("0" + dt.getDate()).slice(-2);
            var month = ("0" + (dt.getMonth() + 1)).slice(-2);
            return dt.getFullYear() +"-"+ month +"-" + day;
        }

        sortResult(prop,asc){
            this.ProductList = this.DepartmentListWithoutFilter.sort(function(a,b){
                  if (prop=="amount"){
                        let a1:number;
                        let b1:number;

                        a1= parseFloat(a[prop]);
                        b1= parseFloat(b[prop]);
                    if(asc){
                        return (a1>b1)?1 : ((a1<b1) ?-1 :0);
                    }
                    else{
                      return (b1>a1)?1 : ((b1<a1) ?-1 :0);
                    }
                  }
                  else{
              if(asc){
                  return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
              }
              else{

                return (a[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
              }
                  }
            })
          }

}

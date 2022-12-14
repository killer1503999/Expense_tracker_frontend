import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import {HttpClient} from '@angular/common/http';
import * as saveAs from 'file-saver';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
 

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

  disabledbutton="false";
  filesforcheck:File;
  imageformart=this.services.recieptImageformaturl.toString();
  
//   filecheckname:String;
  


  
      

  ngOnInit(): void {
      console.log(this.dep.recieptImage);
      console.log(typeof(this.dep.recieptImage))
    this.id=this.dep.id;
    this.amount=this.dep.amount;
    this.expenseCategory=this.dep.expenseCategory;
    this.comments=this.dep.comments;
    this.recieptImage=this.dep.recieptImage;
    console.log(this.dep.recieptImage);
    console.log(typeof(this.dep.recieptImage));

    this.userId=this.dep.userDetail;
    this.date=this.dep.date;
    this.recieptImageUrl=this.services.PhotoUrl+this.recieptImage
  
    this.services.getProductList(this.dep.userId)
//     console.log("?????????????????????????????????????????///////////////////////////////////")
//     console.log(typeof(this.dep.date.getDate))
//     console.log(typeof(this.dep.date.getMonth))
//     console.log(typeof(this.dep.date.getFullYear))
//     console.log(this.dep.date.getDate)
//     console.log(this.dep.date.getMonth)
    console.log(this.userId)
//     console.log(new Date((this.date.getFullYear.toString()+this.date.getMonth.toString()+this.date.getDate.toString())))
   
//     console.log(this.date.getFullYear+this.date.getMonth+)
    
//     console.log((this.date.getTime));
    }
    addDepartment(){
      const fd=new FormData();
      fd.append("expenseCategory",this.expenseCategory);
      fd.append('date',this.date.toString());
      fd.append("amount",this.amount.toString());
      fd.append("comments",this.comments);
      if (this.selectedFile !=null){
            fd.append('recieptImage',this.selectedFile);
      }
      else{
            fd.append('recieptImage','');
      }
      
      
      console.log(fd.getAll('image'));
      fd.append('userId',this.userId.toString());
      console.log(this.date)


      if(confirm('Are you sure??')){
        this.services.addProduct(this.userId,fd).subscribe(res=>{
          alert("Done!".toString());
          });
      }
      
      //   console.log(res)
      // });
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
          this.services.updateProductDetails(this.userId,this.id,fd).subscribe(res=>{
            alert("Done!".toString());
            });
        }
        this.services.getProductList(this.dep.userId)
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
          this.services.updateProductDetails(this.userId,this.id,fd).subscribe(res=>{
            alert("Done!".toString());
            });
        }
        this.services.getProductList(this.dep.userId)
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
      if (this.selectedFile !=null){if(this.amount <1 || this.expenseCategory =="" || this.comments == "" || this.validateFile(this.selectedFile)==false) {
            return true
          }
          return false

      //     || this.recieptImage==null || this.selectedFile==null || this.validateFile(this.selectedFile)==false
          }
          else{
            {if(this.amount <1 || this.expenseCategory =="" || this.comments == "" ) {
                  return true
                }
                return false
            //     || this.recieptImage==null || this.selectedFile==null || this.validateFile(this.selectedFile)==false
                }}
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

      
      
}



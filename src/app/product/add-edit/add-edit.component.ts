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
  quantity:0;
  productsName:"";
  description:"";
  image:File;
  factoryName:number;
  productList=[];
  imageUrl:string;
  file_name:String;

  disabledbutton="false";
  filesforcheck:File;
  imageformart=this.services.imageformaturl.toString();
  
//   filecheckname:String;
  


  


  ngOnInit(): void {
    this.id=this.dep.id;
    this.quantity=this.dep.quantity;
    this.productsName=this.dep.productsName;
    this.description=this.dep.description;
    this.image=this.dep.image;
    this.factoryName=this.dep.factoryName;
    this.imageUrl=this.services.PhotoUrl+this.image
  
    this.services.getProductList(this.dep.factoryName)
    console.log(typeof this.image);
    }
    addDepartment(){
      const fd=new FormData();
      fd.append("quantity",this.quantity.toString());
      fd.append("productsName",this.productsName);
      fd.append("description",this.description);
      fd.append('image',this.selectedFile,this.selectedFile.name);
      console.log(fd.getAll('image'));
      fd.append('factoryName',this.factoryName.toString());


      if(confirm('Are you sure??')){
        this.services.addProduct(this.factoryName,fd).subscribe(res=>{
          alert("Done!".toString());
          });
      }
      
      //   console.log(res)
      // });
    }
  
    updateDepartment(){
      const fd=new FormData();
      if (this.selectedFile!=null){
        console.log("this.selectedFile!=null");
        fd.append("quantity",this.quantity.toString());
        fd.append("productsName",this.productsName);
        fd.append("description",this.description);
        fd.append('image',this.selectedFile,this.selectedFile.name);
        
        fd.append('factoryName',this.factoryName.toString());
        console.log(this.quantity);
        if(confirm('Are you sure??')){
          this.services.updateProductDetails(this.factoryName,this.id,fd).subscribe(res=>{
            alert("Done!".toString());
            });
        }
        this.services.getProductList(this.dep.factoryName)
      }
      if (this.selectedFile==null) {
        console.log("this.selectedFile==null");
        fd.append("quantity",this.quantity.toString());
        fd.append("productsName",this.productsName);
        fd.append("description",this.description);
        // fd.append('image',this.selectedFile,this.selectedFile.name);
        
        fd.append('factoryName',this.factoryName.toString());
        console.log(this.quantity);
        if(confirm('Are you sure??')){
          this.services.updateProductDetails(this.factoryName,this.id,fd).subscribe(res=>{
            alert("Done!".toString());
            });
        }
        this.services.getProductList(this.dep.factoryName)
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
      if (this.services.imageformaturl.includes(ext.toLowerCase())) {
            console.log(filecheckname);
          return true;
      }
      else {
            console.log(this.services.imageformaturl.includes(ext.toLowerCase()));
            console.log(ext.toLowerCase());
            console.log(this.services.imageformaturl);
          return false;
      }
  }
    download(){
      console.log("this.imageUrl");
      this.http.get(this.imageUrl,{responseType: 'blob'}).subscribe((data:Blob | MediaSource) =>
      {let downloadURL = window.URL.createObjectURL(data)
      this.file_name=<String>(this.image.toString().substring(this.image.toString().lastIndexOf('/')+1));
      saveAs(downloadURL,this.file_name)}
      
      )
      // filecheckname.substring(filecheckname.lastIndexOf('.'))
      // console.log(typeof(this.image.toString()));
      // console.log(this.image.toString().substring(this.image.toString().lastIndexOf('/')+1));
    }
    
  isDisabled():boolean {
    if(this.quantity <1 || this.productsName =="" || this.description == "" || this.image==null || this.selectedFile==null || this.validateFile(this.selectedFile)==false) {
      return true
    }
    return false
    }
    isDisabledup():boolean {
      
      if(this.quantity <1 || this.productsName =="" || this.description == "" || this.validateFile(this.selectedFile)==false ) {
            console.log(this.quantity,this.productsName,this.description,)
        return true

      }
      return false
      }
      
}



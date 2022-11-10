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
  DepartmentList:any=[];

  Modaltitle: string;
  ActivateAddEditProductDetails:boolean = false;
  dep:any;
  Status:"";
  teststring="99";

  DepartmentIdFilter:string="";
  DepartmentNameFilter:string="";
  DepartmentListWithoutFilter:any=[];

  test=true;

  constructor(private services:SharedService) { }

  ngOnInit(): void {
    this.message=this.services.getMessage();
    this.refreshProductList(this.message.userId);
    console.log()

  }

  refreshProductList(messaage) {
    this.services.getProductList(messaage).subscribe(data => {
      this.ProductList=data["message"];
      console.log(this.ProductList);
      this.DepartmentListWithoutFilter=data["message"]
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

 addClick(){
  this.dep={
    id:0,
    expenseCategory:"",
    date:Date(),
    amount:0,
    comments:"",
    recieptImage:File,
    approvedStatus:"",
    approversComments:"",
    userDetail:this.message.userId,
  }

  this.Modaltitle="Add Expense";
  this.ActivateAddEditProductDetails = true;

 }
 closeClick(){
  this.ActivateAddEditProductDetails=false;
  this.refreshProductList(this.message.userId);
 }
editClick(productDetails){
  this.dep=productDetails;
  console.log(this.dep);
//   console.log(this.dep.recieptImage);
  this.Modaltitle="Edit Product Details";
  this.ActivateAddEditProductDetails=true;
  this.refreshProductList(this.message.userId);
}

deleteClick(item){
  if(confirm('Are you sure??')){
    this.services.deleteProductDetails(this.message.userId,item.id).subscribe(data=>{
      alert("Done!".toString());
      this.refreshProductList(this.message.userId);
    })
  }
}
Expand(productDetails){
  this.dep=productDetails;
  this.Modaltitle="Description of Product";
  this.ActivateAddEditProductDetails=true;
}
ConvertDateToStringFormat(dt:Date):string{
      dt = new Date(dt);
      var day = ("0" + dt.getDate()).slice(-2);
      var month = ("0" + (dt.getMonth() + 1)).slice(-2);
      return dt.getFullYear() +"/"+ month +"/" + day;
}
    FilterFn(){
      var DepartmentIdFilter = this.DepartmentIdFilter;
      var DepartmentNameFilter = this.DepartmentNameFilter;

      this.ProductList = this.DepartmentListWithoutFilter.filter(function (el){
            console.log(el)
          return el.approvedStatus.toString().toLowerCase().includes(
            DepartmentIdFilter.toString().trim().toLowerCase()
          )&&
          el.expenseCategory.toString().toLowerCase().includes(
            DepartmentNameFilter.toString().trim().toLowerCase()
          )
      });
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
AcceptorReject(status){
      this.Status=status.target.value;
      this.DepartmentIdFilter=status.target.value;
}
isDisabledup(product){
      if(product["approvedStatus"] == "Pending"){
            return true
      }
      else{
            return false
      }
}
}

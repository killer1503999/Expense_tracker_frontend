import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-edit-factory',
  templateUrl: './add-edit-factory.component.html',
  styleUrls: ['./add-edit-factory.component.css']
})
export class AddEditFactoryComponent implements OnInit {

  constructor(private services:SharedService) { }
  @Input() dep:any;
  id:number;
  userId :"";
  userName:"";
  factoryList: any=[];
  allowaddFactory=true;
  idNotInexisting=false

  
  
  ngOnInit(): void {
    this.userName=this.dep.userName;
    this.userId =this.dep.userId ;
    this.factoryList=this.services.getMessage()
//     this.services.getFactoryList().subscribe(data => {
//       this.factoryList=data;
//     })
//     console.log(this.dep.userId)
  }
  
  disabledbutton=false;

  isDisabled():boolean {
      
  if(this.userId  == "" || this.userName =="" || this.allowaddFactory == false) {
    return true
  }
  return false
  } 
  ischecked():boolean {
      
  if(this.allowaddFactory == false) {
    return true
  }
  return false
  } 
  checkunique(userId){
      // this.Status=status.target.value;
            console.log(userId.target.value)
            // console.log(this.factoryList)
            console.log(typeof(userId.target.value))
      for (let key in this.factoryList) {
            // console.log(this.factoryList[key]);
            // console.log(typeof(this.factoryList[key]["userId"]));

            if(this.factoryList[key]["userId"]==userId.target.value){
                  this.allowaddFactory=false;
                  this.idNotInexisting=true;
            
                  break;
            }
            else{
                  this.allowaddFactory=true;
                  this.idNotInexisting=false;
            }
        }
  }
  addFactory(){
      this.services.getFactoryList().subscribe(data => {
            this.factoryList=data;
            
            for (let key in data) {
                  if(data[key]==this.userId){
                        this.allowaddFactory=true;
                        break;
                  }
              }

            
          })
      
      
    const fd=new FormData();
      fd.append("userId ",this.userId) ;
      fd.append("userName",this.userName);

      // this.services.postFactoryList(fd).subscribe(res=>{
      //   console.log(res,"post")
      // });
      if(confirm('Are you sure??')){
        this.services.postFactoryList(fd).subscribe(res=>{
          alert("Done!".toString());
        })
      }

  }
  updateFactory(){
    
    
  }

}

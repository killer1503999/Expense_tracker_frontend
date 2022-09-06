import { Component, OnInit,Input } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-factory',
  templateUrl: './add-edit-factory.component.html',
  styleUrls: ['./add-edit-factory.component.css']
})
export class AddEditFactoryComponent implements OnInit {

  constructor(private services:SharedService) { }
  @Input() dep:any;
  id:number;
  name:"";
  location:"";

  
  
  ngOnInit(): void {
    this.id=this.dep.id;
    this.location=this.dep.location;
    this.name=this.dep.name;
    this.services.getFactoryList()
  }
  disabledbutton=false;

  isDisabled():boolean {
  if(this.name == "" || this.location =="") {
    return true
  }
  return false
  } 
  addFactory(){
    const fd=new FormData();
      fd.append("name",this.name);
      fd.append("location",this.location);

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

import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';
@Component({
  selector: 'app-show-edit',
  templateUrl: './show-edit.component.html',
  styleUrls: ['./show-edit.component.css']
})
export class ShowEditComponent implements OnInit {

  constructor(private services: SharedService) { }

  factoryList: any=[];
  Modaltitle:string;
  ActivateAddEditFactory:boolean;
  dep:any;
  ngOnInit(): void {
     this.refreshFactoryList();
  }

  refreshFactoryList() {
    this.services.getFactoryList().subscribe(data => {
      this.factoryList=data;
    })
    
  }
  addClick(){
    this.dep={
      id:0,
      name:"",
      location:"",

    }
  this.Modaltitle="Add Factory";
  this.ActivateAddEditFactory = true;

  }
  closeClick(){
    this.ActivateAddEditFactory=false;
  this.refreshFactoryList();

  }
  deleteFactory(factory){
    if(confirm('Are you sure??')){
      this.services.deleteFactoryList(factory.id).subscribe(data=>{
        alert("Done!".toString());
        this.refreshFactoryList();
      })
    }
  }
  sendMessage(messsage){
     this.services.sendMessage(messsage);
  }
}

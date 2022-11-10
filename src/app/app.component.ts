import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
      constructor(private services: SharedService) { }
  title = 'crud_app';
  user="user"
  approver="approver"
  
  changeaccess(getacces){
      this.services.pageaccess=getacces;
  }
}

import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  message: any
  ProductList: any=[];

  constructor(private services:SharedService) { }

  ngOnInit(): void {
    

  }

  

}

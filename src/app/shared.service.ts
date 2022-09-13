import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
const baseUrl = 'https://nileshdjangobackend.azurewebsites.net/factory';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
// this.http = http;
readonly APIUrl="https://nileshdjangobackend.azurewebsites.net/"
readonly PhotoUrl="https://assessmentstgacc.blob.core.windows.net/nileshimagescontainer"
readonly imageformaturl=['.jpg', '.jpeg', '.jpg']
  constructor(private http:HttpClient) { }


  getFactoryList(){
    return this.http.get(`${baseUrl}/`);
  }
  postFactoryList(val){
    console.log(val,"postFactoryList");
    return this.http.post(`${baseUrl}/`,val);
    
  }
  deleteFactoryList(id){
    console.log(id,"postFactoryList");
    return this.http.delete(`${baseUrl}/${id}/delete/`);
    
  }

  getProductList(id){

    return this.http.get(`${baseUrl}/${id}/`);
    
  }

  getProductDetails(id,val){
    return this.http.get(`${baseUrl}/${id}/${val}/`);
  }

  addProduct(id,values:any){
    console.log(`${baseUrl}/${id}/`);
    return this.http.post(`${baseUrl}/${id}/`,values);
  }

  updateProductDetails(id,val,values:any){
    return this.http.put(`${baseUrl}/${id}/${val}/`,values);
  }

  deleteProductDetails(id,val){
    return this.http.delete(`${baseUrl}/${id}/${val}/`);
  }

  message:string;
  sendMessage(data:any){
    this.message = data;
  }
  getMessage(){
    return this.message;
}

}


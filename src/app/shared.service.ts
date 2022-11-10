import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const baseUrl = 'https://assessment-apim.azure-api.net/expense/Expense';
@Injectable({
      providedIn: 'root'
})
export class SharedService {
      test:any="";
      // this.http = http;
      readonly APIUrl = "https://nileshdjangobackend.azurewebsites.net/"
      readonly PhotoUrl = "https://assessmentstgacc.blob.core.windows.net/nileshexpensetracker/nileshexpensetracker"
      readonly recieptImageformaturl = ['.jpg', '.jpeg', '.jpg']
      pageaccess = "user"

      constructor(private http: HttpClient) { }
      authenticate = "";
      httpheaders= new HttpHeaders({
            "Ocp-Apim-Subscription-Key": "918a8a3af99e4b43a2284ad7c1d2ef15"
      })
      
      getsecerts(){
            this.http.get('https://nilesh-expense-tracker.azurewebsites.net/api/httptriggergetsecerts?').subscribe(data => {
            this.test=data;
            // console.log(this.test);
          })
          return this.test
      }
      getFactoryList() {
            let head = this.getsecerts();
            let httpheaders= new HttpHeaders({
                  "Ocp-Apim-Subscription-Key": head
            })
            return this.http.get(`${baseUrl}/`,{headers:this.httpheaders});
      }
      postFactoryList(val) {
            
            return this.http.post(`${baseUrl}/`, val,{headers:this.httpheaders});
      }
      deleteFactoryList(pk) {
            
            return this.http.delete(`${baseUrl}/${pk}/`,{headers:this.httpheaders});
      }

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      getProductList(pk) {
            return this.http.get(`${baseUrl}/${pk}/expense/`,{headers:this.httpheaders});
      }

      getProductDetails(pk, id) {
            return this.http.get(`${baseUrl}/${pk}/expense/details/${id}/`,{headers:this.httpheaders});
      }

      addProduct(pk, values: any) {
            return this.http.post(`${baseUrl}/${pk}/expense/`, values,{headers:this.httpheaders});
      }

      updateProductDetails(pk, id, values: any) {
            return this.http.put(`${baseUrl}/${pk}/expense/details/${id}/`, values,{headers:this.httpheaders});
      }

      deleteProductDetails(pk, id) {
            return this.http.delete(`${baseUrl}/${pk}/expense/details/${id}/`,{headers:this.httpheaders});
      }

      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      getapproversAccessList(pk) {
            return this.http.get(`${baseUrl}/${pk}/approver/access/`,{headers:this.httpheaders});
      }

      getapproversAccessDetails(pk, id) {

            return this.http.get(`${baseUrl}/${pk}/approver/access/${id}/`,{headers:this.httpheaders});
      }

      addapproversAccess(pk, values: any) {

            
            return this.http.post(`${baseUrl}/${pk}/expense/`, values,{headers:this.httpheaders});
      }

      updateapproversAccessDetails(pk, id, values: any) {
            
            return this.http.put(`${baseUrl}/${pk}/approver/access/${id}/`, values,{headers:this.httpheaders});
      }

      deleteapproversAccessDetails(pk, id) {
            
            return this.http.delete(`${baseUrl}/${pk}/approver/access/${id}/`,{headers:this.httpheaders});
      }
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

      message: string;
      sendMessage(data: any) {
            this.message = data;
      }
      getMessage() {
            return this.message;
      }

}




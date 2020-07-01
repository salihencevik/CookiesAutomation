import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendEmail } from 'src/app/Model/SendEmail';
import { Customer } from 'src/app/Model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl : string = "https://localhost:44369/api/Customer";

  constructor(private httpClient:HttpClient) { } 
  SendSMS(SendEmail:SendEmail){    
    let api = this.apiUrl + "/" + "SendEmail";
   return this.httpClient.post(api,SendEmail)
  };   
  payment(customerId:number,model = []){
    debugger;
    let api = this.apiUrl + "/" + "Payment" + "/" + customerId;
    return this.httpClient.post(api,model)
  }
  getItemId(id:number){
    let url = this.apiUrl + "/" + "getItemId" + "/" + id;
    return this.httpClient.get(url);
  }  
}

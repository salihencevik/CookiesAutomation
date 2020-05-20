import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SendEmail } from 'src/app/Model/SendEmail';

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
}

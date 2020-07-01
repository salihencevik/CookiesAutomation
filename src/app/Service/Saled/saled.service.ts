import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaledService {

  private apiUrl : string = "https://localhost:44369/api/ProductSaleds/";

  constructor(private httpClient:HttpClient) { } 
  
  getCustomerSaled(customerId:number){
    let api = this.apiUrl + "GetProductSaled" + "/" + customerId;
   return this.httpClient.get(api);
  }
}

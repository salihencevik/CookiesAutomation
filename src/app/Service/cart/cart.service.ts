import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Customer } from 'src/app/Model/Customer';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl : string = "https://localhost:44369/api/Carts/";

  constructor(private httpClient:HttpClient) { } 

  getCart(id:number){ 
    let api = this.apiUrl + id
   return this.httpClient.get(api)
  }
  addCartForid(id:number,spinner:number,customerId:number){
    let api = this.apiUrl + "addCart" + "/" +  id + "/" + spinner + "/" + customerId;
    return this.httpClient.get(api); 
  }
} 
import { Injectable } from '@angular/core'; 
import {HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators'
import { Cookies } from 'src/app/Model/Cookies';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product;
  private apiUrl : string = "https://localhost:44369/api/Cookies/";
  constructor(private httpClient:HttpClient) { } 
  getProduct(page:number,pageSize:number,categoryName:string,quickSearch:string){   
      let api = this.apiUrl + "getItems" +"/" + page + "/" + pageSize + "/" + categoryName + "/" + quickSearch;
      return this.httpClient.get<Cookies>(api).pipe(tap(x=> {  
        debugger;
        this.product = x;
      })); 
  }
  postProduct(cookies:Cookies){
    debugger;
    let api = this.apiUrl
    return this.httpClient.post(api,cookies);
  }
  getProductId(id:number) {
    let api = this.apiUrl + "getProduct" + "/" + id;
    return this.httpClient.get<Cookies>(api).pipe(tap(x=> { 
    }));
  }
  getProductForCart(id:number){
    let api = this.apiUrl + "getProductForCart" + "/" + id;
    return this.httpClient.get<Cookies>(api).pipe(tap(x=> { 
    }));
  }
  getProductForLogedCart(id:number){
    let api = this.apiUrl + "getProductForLogedCart" + "/" + id;
    return this.httpClient.get<Cookies>(api).pipe(tap(x=> { 
    }));
  }
  getProductIdForDetail(id:number) {
    let api = this.apiUrl  + id;
    return this.httpClient.get<Cookies>(api).pipe(tap(x=> { 
    }));
  }
  updateProduct(cookies:Cookies){ 
    debugger;
    let api = this.apiUrl + "Update"
    return this.httpClient.post(api,cookies);
  }
}

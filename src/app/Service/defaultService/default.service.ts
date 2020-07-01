import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import {tap} from 'rxjs/operators' 
@Injectable({
  providedIn: 'root'
})
export class DefaultService<T extends any> {

  constructor(private httpClient:HttpClient) { }
  private apiUrl : string = "https://localhost:44369/api/"; 

  getItems(apiName:string){ 
    debugger;
    let url = this.apiUrl + apiName + "/" + "getItems";
    return this.httpClient.get<T>(url).pipe(tap(x=> {  
    }));
  }
  delete(apiName:string,Id:number){ 
    let api = this.apiUrl + apiName + "/"  + "delete" + "/" + Id;
    return this.httpClient.delete(api);
  }
  add(url:string,T){
    debugger;
    let api = this.apiUrl + url + "/";
    return this.httpClient.post(api,T);
  }
  update(url:string,T,Id:number){
    debugger;
    let api = this.apiUrl + url + "/" +"update/" + Id;
    return this.httpClient.post(api,T);
  }
  getItemId(apiName:string,id:number){
    let url = this.apiUrl + apiName + "/" + "getItemId" + "/" + id;
    return this.httpClient.get(url);
  }  
  getCustomerId(apiName:string,id:number){
    let url = this.apiUrl + apiName + "/" + "getCustomerId" + "/" + id;
    return this.httpClient.get<T>(url).pipe(tap(x=> {  
    }));
  }  
  addCustomer(url:string,T){
    debugger;
    let api = this.apiUrl + url + "/" + "addCustomer";
    return this.httpClient.post(api,T);
  }
}

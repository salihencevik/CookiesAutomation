import { Injectable } from '@angular/core'; 
import {HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators'
import { Category } from 'src/app/Model/Category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl : string = "https://localhost:44369/api/Categories";
  constructor(private httpClient:HttpClient) { } 
  getCategory(){ 
    let api = this.apiUrl + "/" + "getItems";
    return this.httpClient.get<Category>(api).pipe(tap(x=> { 
    }));
  }
  getCategoryName(categoryName:string){
    let api = this.apiUrl + "/"  + "getCategoryNames" + "/" + categoryName ;
    return this.httpClient.get<Category>(api).pipe(tap(x=> { 
    }));
  }
}

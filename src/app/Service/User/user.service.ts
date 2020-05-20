import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from 'src/app/Model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }
  private apiUrl : string = "https://localhost:44369/api/Users"; 

  Userlogin(UserLogin:UserLogin){   
    let api = this.apiUrl + "/" + "UserLogin";
    debugger;
    return  this.httpClient.post(api,UserLogin); 
 };   
}

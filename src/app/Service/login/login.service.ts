import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'; 
import { Login } from 'src/app/Model/login';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService { 
  private apiUrl : string = "https://localhost:44369/api/Customer";
  isUserLoad:boolean;
  productId
  constructor(private httpClient:HttpClient,private router:Router,private route:ActivatedRoute) {       }

  login(login:Login){   
    return  this.httpClient.post(this.apiUrl,login); 
 };   
 setUserLoad(){
     this.isUserLoad = true;
   }
   getUserLoad(){
     return this.isUserLoad;
   }
}

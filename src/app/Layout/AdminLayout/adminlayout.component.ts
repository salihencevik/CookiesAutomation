import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlayout',
  templateUrl: './adminlayout.component.html',
  styleUrls: ['./adminlayout.component.css']
})
export class AdminlayoutComponent implements OnInit {
  userId:number;
  constructor(private router:Router) {
    this.userId = +localStorage.getItem("UserId");  
   if(this.userId == 0){
      this.router.navigateByUrl('UserLogin');
    } 
   }

  ngOnInit() {
  }
logout(){
  localStorage.removeItem("UserId")
  this.router.navigateByUrl('UserLogin');
}
}

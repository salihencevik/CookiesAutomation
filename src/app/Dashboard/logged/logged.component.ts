import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageMode } from 'src/app/Enum/PageMode';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.css']
})
export class LoggedComponent implements OnInit {
  @Input() mode: PageMode; 
  @Input() user;
  @Input() login: boolean = false;
  @Input() cartCount;
  @Output() userChange = new EventEmitter();
  @Output() modeChange = new EventEmitter();
  @Output() loginChange = new EventEmitter(); 
  @Output() cartCountChange = new EventEmitter();  
  constructor() { }

  ngOnInit() {   
  } 
   logout(){
    localStorage.removeItem("customerId"); 
    this.modeChange.emit(this.mode = PageMode.View);
    this.userChange.emit(null)
    this.cartCountChange.emit(0);
    localStorage.removeItem("cartCount"); 
  }
}

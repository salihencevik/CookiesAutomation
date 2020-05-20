import { Component, OnInit } from '@angular/core';
import { PageMode } from 'src/app/Enum/PageMode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mode = PageMode.List;
  PageModes = PageMode;
  constructor() { }

  ngOnInit() {
    
  }
    backToList() {
      this.mode = PageMode.List;
    }; 
    create() {
      this.mode = PageMode.Create;
    }; 
    updatte() {
      this.mode = PageMode.Update;
    }; 
}

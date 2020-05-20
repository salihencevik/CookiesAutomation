import { Component, OnInit } from '@angular/core';
import { PageMode } from 'src/app/Enum/PageMode';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/Service/validation/validation.service';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Customer } from 'src/app/Model/Customer';

@Component({
  selector: 'app-customer-list-add',
  templateUrl: './customer-list-add.component.html',
  styleUrls: ['./customer-list-add.component.css']
})
export class CustomerListAddComponent implements OnInit {
  PageModes = PageMode;
  mode = PageMode.List;  
  columns: any[];
  CustomerForm:FormGroup;



  constructor(public validation:ValidationService,private fb: FormBuilder,private defaultService:DefaultService<Customer>) { }


  ngOnInit() { 
    this.columns = [
      {headerName: 'Id', field: 'id' },
      {headerName: 'Adı', field: 'name'},
      {headerName: 'Email', field: 'email'}, 
      {headerName: 'Telefon', field: 'phone'}, 
  ]; 
  }

}

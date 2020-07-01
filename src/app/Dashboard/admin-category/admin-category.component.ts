import { Component, OnInit } from '@angular/core';
import { PageMode } from 'src/app/Enum/PageMode';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/Service/validation/validation.service';
import { Category } from 'src/app/Model/Category';
import { DefaultService } from 'src/app/Service/defaultService/default.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  constructor(public validation:ValidationService,private fb: FormBuilder,private defaultService:DefaultService<Category>) { }
  PageModes = PageMode;
  mode = PageMode.List;  
  columns: any[]; 
  categoryForm:FormGroup;
  ngOnInit() {
    this.categoryForm = this.fb.group({
      categoryName:new FormControl("",Validators.required), 
    });
    this.columns = [
      {headerName: 'Id', field: 'id' },
      {headerName: 'Adı', field: 'categoryName'}, 
    ]; 
  }
  get getControls(){
    return this.categoryForm.controls;
  }
  onSubmit(){
    if (this.categoryForm.valid){  
      this.defaultService.add("Categories",this.categoryForm.value).subscribe(data => {
        this.mode = PageMode.List 
      })
    }
  }
  cancelButton(){
    this.mode = PageMode.List 
  }  
}

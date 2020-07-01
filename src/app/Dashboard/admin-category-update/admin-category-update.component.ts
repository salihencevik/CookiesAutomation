import { Component, OnInit } from '@angular/core';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Category } from 'src/app/Model/Category';
import { ValidationService } from 'src/app/Service/validation/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/Enum/PageMode';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-category-update',
  templateUrl: './admin-category-update.component.html',
  styleUrls: ['./admin-category-update.component.css']
})
export class AdminCategoryUpdateComponent implements OnInit {

  constructor(private fb: FormBuilder,private defaultService:DefaultService<Category>,public validation:ValidationService,private router:Router,private route:ActivatedRoute) { }
  PageModes = PageMode;
  mode = PageMode.List;  
  columns: any[]; 
  categoryForm:FormGroup;
  categoryId;
  result;
  ngOnInit() {
    this.categoryId = Number(this.route.snapshot.paramMap.get("id"));
    this.defaultService.getItemId("Categories",this.categoryId).subscribe(data => { 
      this.result = data;
      this.getControls.categoryName.setValue(this.result.categoryName); 
    });
    this.categoryForm = this.fb.group({
      categoryName:new FormControl("",Validators.required), 
    });
  }
  get getControls(){
    return this.categoryForm.controls;
  }
  onSubmit(){
    if (this.categoryForm.valid){  
      this.defaultService.update("Categories",this.categoryForm.value,this.categoryId).subscribe(data => {
        this.router.navigateByUrl('Admin/Category')
      })
    }
  }
}

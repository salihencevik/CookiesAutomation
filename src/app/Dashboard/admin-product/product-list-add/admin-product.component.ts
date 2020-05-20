import { Component, OnInit, ViewChild } from '@angular/core';
import { PageMode } from 'src/app/Enum/PageMode';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/Service/validation/validation.service'; 
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Category } from 'src/app/Model/Category';
import { GridComponent } from '../../grid/grid.component';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {
  @ViewChild(GridComponent, { static: false })  grid: GridComponent;

  PageModes = PageMode;
  mode = PageMode.List;  
  productForm:FormGroup;
  constructor(public validation:ValidationService,private fb: FormBuilder,private defaultService:DefaultService<Category>) { }
  columns: any[];
  categoryList;
  ngOnInit() {
    this.getCategory();
    this.productForm = this.fb.group({
      Name:new FormControl("",Validators.required),
      Feature:new FormControl("",[Validators.required]),
      Picture:new FormControl("",Validators.required),
      Price:new FormControl("",[Validators.required,Validators.maxLength(11)]),
      Category:new FormControl("",[Validators.required])
    });
      this.columns = [
        {headerName: 'Id', field: 'id' },
        {headerName: 'Adı', field: 'name'},
        {headerName: 'Açıklama', field: 'feature'},
        {headerName: 'Resim', field: 'picture' },
        {headerName: 'Fiyat', field: 'price'},
        {headerName: 'Kategori', field: 'categoryName'},
    ]; 
  }
  get getControls(){
    return this.productForm.controls;
  }
  getCategory(){
    this.defaultService.getItems("Categories").subscribe(data => {
      this.categoryList = data;
      console.log(this.categoryList)
    })
  }
  displayCategoryName(category){
    return category.categoryName;
  }
  cancelButton(){
    this.mode = PageMode.List 
  }  
}

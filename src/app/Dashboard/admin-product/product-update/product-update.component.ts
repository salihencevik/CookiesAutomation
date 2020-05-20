import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Category } from 'src/app/Model/Category';
import { Router ,ActivatedRoute} from '@angular/router';
import { ValidationService } from 'src/app/Service/validation/validation.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  productUpdateForm:FormGroup;
  filteredOptions: Observable<string[]>;
  productId:number;
  constructor(private defaultService:DefaultService<Category>,public validation:ValidationService,private router:Router,private route:ActivatedRoute) { }
  categoryList;
  result;
  myControl = new FormControl();
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.getCategory();
  
    this.productId = Number(this.route.snapshot.paramMap.get("id"));
    this.defaultService.getItemId("Cookies",this.productId).subscribe(data => {
      console.log(data[0])
      this.result = data[0];
      this.getControls.Name.setValue(this.result.name);
      this.getControls.Feature.setValue(this.result.feature);
      this.getControls.Picture.setValue(this.result.picture);
      this.getControls.Price.setValue(this.result.price);
      this.getControls.CategoryName.setValue(this.result.categoryName); 
    });
    this.productUpdateForm = new FormGroup({
      Name:new FormControl("",Validators.required),
      Feature:new FormControl("",[Validators.required]),
      Picture:new FormControl("",Validators.required),
      Price:new FormControl("",[Validators.required,Validators.maxLength(11)]),
      CategoryName:new FormControl("",[Validators.required])
    });
  }
  get getControls(){
    return this.productUpdateForm.controls;
  }
  getCategory(){
    this.defaultService.getItems("Categories").subscribe(data => {
      this.categoryList = data; 
    })
  }
  displayCategoryName(Category){
    debugger;
    return Category.categoryName;
  } 
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase(); 
    return this.categoryList.filter(option => option.toLowerCase().includes(filterValue));
  }
}

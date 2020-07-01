import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Category } from 'src/app/Model/Category';
import { Router ,ActivatedRoute} from '@angular/router';
import { ValidationService } from 'src/app/Service/validation/validation.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductService } from 'src/app/Service/Product/product.service';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  productUpdateForm:FormGroup;
  filteredOptions: Observable<string[]>;
  productId:number;
  constructor(private defaultService:DefaultService<Category>,public validation:ValidationService,private router:Router,private route:ActivatedRoute,private productService:ProductService) { }
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
      this.getControls.Id.setValue(this.result.id);
      this.getControls.Feature.setValue(this.result.feature);
      this.getControls.Picture.setValue(this.result.picture);
      this.getControls.Price.setValue(this.result.price);
      this.getControls.Category.setValue(this.result.categoryName); 
    });
    this.productUpdateForm = new FormGroup({
      Name:new FormControl("",Validators.required),
      Id:new FormControl("",Validators.required),
      Feature:new FormControl("",[Validators.required]),
      Picture:new FormControl("",Validators.required),
      Price:new FormControl("",[Validators.required,Validators.maxLength(11)]),
      Category:new FormControl("",[Validators.required])
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
  onSubmit(){
    if (this.productUpdateForm.valid){  
      debugger;
      var query = String(this.productUpdateForm.value.Price);
      this.productUpdateForm.value.Price = query;
      this.productService.updateProduct(this.productUpdateForm.value).subscribe(data => { 
        this.router.navigateByUrl('Admin/Product')
      })
    }
  }
}

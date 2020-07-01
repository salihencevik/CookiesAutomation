import { Component, OnInit, ViewChild, Output, EventEmitter, Input, ViewChildren, QueryList } from '@angular/core';
import { ProductService } from 'src/app/Service/Product/product.service';
import { CategoryService } from 'src/app/Service/Category/category.service';
import { Cookies } from 'src/app/Model/Cookies'; 
import { Router ,ActivatedRoute} from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomelayoutComponent } from 'src/app/Layout/HomeLayout/homelayout.component';
import { SnackBarService } from 'src/app/Service/SnackBar/snackbar.service';
import { CartComponent } from '../cart/cart.component';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/Service/cart/cart.service';
import { PageMode } from 'src/app/Enum/PageMode';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit { 
  constructor(private cartService:CartService,private snackBar:SnackBarService,private productService:ProductService,private categoryService:CategoryService,private router:Router,private route :ActivatedRoute,private homeCom:HomelayoutComponent) {
    this.item = +localStorage.getItem("customerId");     
    this.productCart = JSON.parse(localStorage.getItem("product")); 
   }
  productCart = []; 
  productList; 
  pageSnipperLoading:boolean = true; 
  item:number;  
  cartControll = [];
  categoryList;
  productName:string;
  loadingItem: number = 5;
  productCount:number;
  quickSearch:string;
  page:number = 1; 
  pageSize:number = 9; 
  list = [];
  categoryName:string;
  @ViewChildren(HomelayoutComponent) viewChildren!: QueryList<HomelayoutComponent>;
  ngOnInit() {     
    debugger; 
    this.product(this.page,this.pageSize,this.categoryName,this.quickSearch); 
    this.category();  
  } 
  ngAfterViewInit() { 
    debugger;
    console.log(this.viewChildren);
  }
  SearchBtnClick(productName:string){  
    debugger;
    this.quickSearch = productName;
    this.product(this.page,this.pageSize,this.categoryName,this.quickSearch); 
  } 
  public product(page,pageSize,categoryName,quickSearch){  
    debugger;
    this.productService.getProduct(page,pageSize,categoryName,quickSearch).subscribe(data => {  
    this.productList = data; 
    this.productCount = data[0].totalCount; 
    this.pageSnipperLoading = false;
    });
  }
  pageChange(event){
      this.pageSnipperLoading = true;
      this.page = event;
      this.product(this.page,this.pageSize,this.categoryName,this.quickSearch); 
  } 

  allList(){
    this.categoryName = undefined;
    this.product(this.page,this.pageSize,this.categoryName,this.quickSearch); 
  }
  category(){ 
    this.categoryService.getCategory().subscribe(data=> {
      this.categoryList = data;  
    })
  }

  categoryProduct(categoryName:string){  
    this.page = 1;
    this.categoryName = categoryName;
    this.product(this.page,this.pageSize,categoryName,this.quickSearch);
   }

   createRange() {
    var items: number[] = [];
    for (var i = 1; i <= this.loadingItem; i++) {
      items.push(i);
    }
    return items;
  }
  cartCreate(id:number){     
    debugger;
    if(this.item != 0){
      this.cartService.addCartForid(id,1,this.item).subscribe(data => {  
        this.homeCom.cartCount = this.homeCom.cartCount + 1;  
        this.homeCom.ngOnInit();
        this.homeCom.mode = PageMode.Loged
      });   
      Swal.fire({
        icon: 'success',
        text: "Ürün Sepete Eklendi!",
         showConfirmButton: true,
      })    
    }else{
      if (this.productCart == null) {
        this.cartControll.push(id);
        localStorage.setItem("product",JSON.stringify(this.cartControll));   
        this.productCart = JSON.parse(localStorage.getItem("product"));  
        this.homeCom.cartCount = this.productCart.length; 
        Swal.fire({
          icon: 'success',
          text: "Ürün Sepete Eklendi!",
           showConfirmButton: true,
        })   
        this.homeCom.mode = PageMode.View
      }
      else{
        this.productCart = JSON.parse(localStorage.getItem("product"));  
        this.productCart.push(id)
        localStorage.setItem("product",JSON.stringify(this.productCart));  
        this.homeCom.cartCount = this.productCart.length;
        Swal.fire({
          icon: 'success',
          text: "Ürün Sepete Eklendi!",
           showConfirmButton: true,
        })   
        this.homeCom.mode = PageMode.View
      }   
    } 
  }
}

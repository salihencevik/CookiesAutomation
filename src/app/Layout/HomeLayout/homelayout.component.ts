import { Component, OnInit, ViewChild } from '@angular/core'; 
import { PageMode } from 'src/app/Enum/PageMode';  
import { ProductService } from 'src/app/Service/Product/product.service';
import { SnackBarService } from 'src/app/Service/SnackBar/snackbar.service';
import Swal from 'sweetalert2';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Customer } from 'src/app/Model/Customer'; 
import { CartComponent } from 'src/app/Dashboard/cart/cart.component';
import { ProductComponent } from 'src/app/Dashboard/product/product.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.css']
})

export class HomelayoutComponent implements OnInit {
  PageModes = PageMode;  
  mode = PageMode.View;  
  cartCount:number;
  getCart:boolean=false;
  ApiName:string = "Customer";
  opened :boolean= false; 
  login:boolean = false; 
  item:number; 
  productCart = []; 
  product; 
  cartControll = [];
  user;
  constructor (private productService:ProductService,private snackBar:SnackBarService,private defaultService:DefaultService<Customer>,private router:Router) {
   this.item = +localStorage.getItem("customerId");    
   this.productCart = JSON.parse(localStorage.getItem("product")); 
   this.cartCount = +localStorage.getItem("cartCount");   
   }  
  ngOnInit() {    
    if (this.item != 0) {
      this.logged(this.item);
    } 
    if (this.productCart != null) {
      this.cartlocalStorage(this.productCart);
    } 
  }    
  getMode(event){
    if(event == "Hesabım "){
      if (this.item != 0) {
        this.mode = PageMode.Loged
        this.opened =  true;
        this.login = true;
      }
      else{
        this.mode = PageMode.View
        this.opened = true;
      }  
    }
    else{ 
      if (!this.opened) {
        this.opened = true;
      }
      this.mode = PageMode.Cart
    }
  } 
  cartCreate(id:number){   
    debugger;
    if (this.productCart == null) {
      this.cartControll.push(id);
      localStorage.setItem("product",JSON.stringify(this.cartControll));   
      this.productCart = JSON.parse(localStorage.getItem("product"));  
      this.cartCount = this.productCart.length; 
      Swal.fire({
        icon: 'success',
        text: "Ürün Sepete Eklendi!",
         showConfirmButton: true,
      })   
    }
    else{
      this.productCart = JSON.parse(localStorage.getItem("product"));  
      this.productCart.push(id)
      localStorage.setItem("product",JSON.stringify(this.productCart));  
      this.cartCount = this.productCart.length;
      Swal.fire({
        icon: 'success',
        text: "Ürün Sepete Eklendi!",
         showConfirmButton: true,
      })   
    }  
    if(this.item == null){
      this.mode == this.PageModes.View;
    }else{
      this.mode == this.PageModes.Loged;
    }
  }
  cartlocalStorage(productCart){  
  this.cartCount = this.productCart.length 
  }
  logged(id:number){ 
    debugger;
      this.defaultService.getItemId(this.ApiName,this.item).subscribe(data => { 
        console.log(data);
         this.user = data;
         this.login = true;
      }); 
  }
  public getProductForCart(model:[]){ 

    model.forEach(element => { 
      this.productService.getProductId(element).subscribe(data => { 
      });
    });
  }
}

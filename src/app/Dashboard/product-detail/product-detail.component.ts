import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Service/Product/product.service';
import { Cookies } from 'src/app/Model/Cookies';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/Service/cart/cart.service';
import { HomeComponent } from '../Home/home.component';
import { HomelayoutComponent } from 'src/app/Layout/HomeLayout/homelayout.component';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private router:Router,private route:ActivatedRoute,private productService:ProductService,private cartService:CartService,private homeCom:HomelayoutComponent) { 
    this.customerId = +localStorage.getItem("customerId");    
    this.productCart = JSON.parse(localStorage.getItem("product")); 
  }
  customerId;
  productCart = []; 
  productId;
  cartCount;
  cartControll = [];
  product:Cookies;
  spinners:number = 1;
  ngOnInit() {
    this.productId = Number(this.route.snapshot.paramMap.get("id"));
    this.productService.getProductIdForDetail(this.productId).subscribe(data => { 
      this.product = data[0];
      console.log(this.product)
    });
  }
  spinnerChange(event){
    this.spinners = event;
  }
  submit(id:number){
    debugger;
    if (this.customerId != 0) { 
      this.cartService.addCartForid(id,this.spinners,this.customerId).subscribe(data => { 
      });
    }
    else{
     for (let index = 0; index < this.spinners; index++) { 
       if(this.productCart != null)   {
        this.productCart = JSON.parse(localStorage.getItem("product"));  
        this.productCart.push(id)
        localStorage.setItem("product",JSON.stringify(this.productCart));  
        this.homeCom.cartCount = this.productCart.length;
       }
       else{ 
        debugger;
        this.cartControll.push(id);
        localStorage.setItem("product",JSON.stringify(this.cartControll));   
        this.productCart = JSON.parse(localStorage.getItem("product"));  
        this.homeCom.cartCount = this.productCart.length;  
       } 
     } 
    }
    Swal.fire({
      icon: 'success',
      text: "Ürün Sepete Eklendi!",
       showConfirmButton: true,
    }) 
  }
}

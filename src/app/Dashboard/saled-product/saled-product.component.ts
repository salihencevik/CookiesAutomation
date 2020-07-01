import { Component, OnInit } from '@angular/core';
import { SaledService } from 'src/app/Service/Saled/saled.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/Service/Product/product.service';
import { HomelayoutComponent } from 'src/app/Layout/HomeLayout/homelayout.component';

@Component({
  selector: 'app-saled-product',
  templateUrl: './saled-product.component.html',
  styleUrls: ['./saled-product.component.css']
})
export class SaledProductComponent implements OnInit {
  getId = []
  cart = []
  product;
  productCount;
  productPrice; 
  isSaled:boolean = false;
  user;
  totalPayment = 0; 
  myCart = [];
  constructor( private homeCom:HomelayoutComponent,private saledService:SaledService,private router:Router,private route:ActivatedRoute,private productService:ProductService) { }
customerId:number;
  ngOnInit() { 
    this.homeCom.opened = false 
    this.customerId = Number(this.route.snapshot.paramMap.get("id"));
    this.getData(this.customerId);
  }
  getData(id:number){
    this.saledService.getCustomerSaled(id).subscribe((data : any) => { 
      this.getId = data; 
      this.getproduct(this.getId)
    })
  }
  getproduct(model = []){  
    debugger;
    model.forEach(element => { 
      this.productService.getProductId(element).subscribe(data=> {  
        if(this.getId.length != 0){
            this.cart = this.getId;
        }
        this.productCount = 0;   
        this.product = data; 
        this.totalPayment =   this.totalPayment + this.product.price;
        this.productPrice = 0; 
        this.cart.forEach(cartcount => { 
           if(element == cartcount){
              this.productCount = this.productCount + 1;
              this.productPrice = this.productPrice + this.product.price; 
          }
        });  
        if(this.productCount != 0){
          var result = this.myCart.find(f=>f.id == element);
          if (result == null) {
            this.myCart.push(data);   
          } 
          this.product.productCount = this.productCount;  
          this.product.price = this.productPrice;
        }
      });   
    }); 
  }
}

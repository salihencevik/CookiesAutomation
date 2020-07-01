import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core'; 
import { HomelayoutComponent } from 'src/app/Layout/HomeLayout/homelayout.component';
import { ProductService } from 'src/app/Service/Product/product.service';
import { CartService } from 'src/app/Service/cart/cart.service';
import { HomeComponent } from '../Home/home.component';
import { Cookies } from 'src/app/Model/Cookies';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit { 
  @Input() cart: any[];  
  @Input() user;
  spinnersLoad:boolean = true;
  customerId:number;
  products : Cookies[] = [];
  product; 
  deleteProduct;
  CustomerlogedCart: number[] = [];
  productCount;
  productPrice;
  totalCount;
  productCart;
  constructor(private homeCom:HomelayoutComponent,private productService:ProductService,private cartService:CartService) {  
    this.customerId = +localStorage.getItem("customerId");    
    this.productCart = JSON.parse(localStorage.getItem("product"));  
  }
  ngOnInit() {      
    debugger;
    if(this.user != null){ 
      this.getProductForUser();
    }
    if(this.products == null){
      if(this.customerId != 0){
        this.getlogedCart();
      }
    } 
    if(this.productCart != null){
      this.getProduct(this.productCart);
    }    
      this.spinnersLoad = false 
  }   
  getlogedCart(){   
        this.product = this.user;
        this.product.forEach(element => { 
          this.CustomerlogedCart.push(element.cookiesId);
        });  
        this.getProduct(this.CustomerlogedCart);
  }  
  public getProduct(model: number[]){   
    model.forEach(element => { 
        this.productService.getProductForCart(element).subscribe(data => {  
          debugger;
          this.productCount = 0;   
          this.product = data; 
          this.productPrice = 0;
          if(this.productCart != null) {
            this.productCart.forEach(cartcount => {
              debugger; 
              if(element == cartcount){
                  this.productCount = this.productCount + 1;
                  this.productPrice = this.productPrice + this.product.price;
              }
            });  
          } else{
            this.CustomerlogedCart.forEach(cartcount => {
              debugger; 
              if(element == cartcount){
                  this.productCount = this.productCount + 1;
                  this.productPrice = this.productPrice + this.product.price; 
              }
            });  
          }
          debugger;
          if(this.productCount != 0){
            var result = this.products.find(f=>f.id == element);
            if (result == null) {
              this.products.push(data);  
              console.log(this.products)
              this.spinnersLoad = false;
            } 
            this.product.productCount = this.productCount;  
            this.product.price = this.productPrice;
          }
        });   
    });
    this.spinnersLoad = false;
  }
  getProductForUser(){ 
    for (let index = 0; index < this.user.cartList.length; index++) {
      this.productService.getProductForCart(this.user.cartList[index]).subscribe(data => {  
        this.productCount = 0;   
        this.product = data;  
        this.productPrice = 0; 
        for (let cartcount = 0; cartcount < this.user.cartList.length; cartcount++) { 
          if(this.user.cartList[index] == this.user.cartList[cartcount]){
            this.productCount = this.productCount + 1;
            this.productPrice = this.productPrice + this.product.price;
          }  
        }   
        if(this.productCount != 0){
          var result = this.products.find(f=>f.id == this.user.cartList[index]);
          if (result == null) { 
            this.products.push(data);  
            this.spinnersLoad = false;
          } 
          this.product.productCount = this.productCount;  
          this.product.price = this.productPrice;
        }
      });    
      
    } 
    this.spinnersLoad = false;
  }
  SideBarClose(){
    this.homeCom.opened = false;
  }
  deleteCart(id:number,ProductName:string,ProductCount:number){
    if(this.customerId == 0){
      this.deleteCartForLogout(id,ProductName,ProductCount)
    }else{
      this.deleteCartForLogin(id,ProductName,ProductCount);
    }
  }
  deleteCartForLogin(id:number,ProductName:string,ProductCount:number){ 
        Swal.fire({
      title:  ProductName + " sepetinizden çıkarılaktır.", 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet Çıkar',
      cancelButtonText: 'Hayır Vazgeç',
      reverseButtons: true
    }).then((willDelete) => {
      if (willDelete.value) {  
        debugger;
        this.spinnersLoad = true; 
        this.cartService.deleteCart(id,this.customerId).subscribe(data =>{
          this.spinnersLoad = false;    
          this.deleteProduct = this.user.cartList;
          console.log(this.deleteProduct)
          this.products = [];
          this.cart = [];
          this.deleteProduct.forEach(element => {
            debugger;
            if (element != id) { 
              this.cart.push(element) 
            } 
          });
          this.user.cartList = this.cart;
          if (this.cart != null) {
            this.getProduct(this.cart)
          }else{
            this.products.length = 0;
          }
        })
      }
    }) 
  } 
  deleteCartForLogout(id:number,ProductName:string,ProductCount:number){
    Swal.fire({
      title:  ProductName + " sepetinizden çıkarılaktır.", 
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Evet Çıkar',
      cancelButtonText: 'Hayır Vazgeç',
      reverseButtons: true
    }).then((willDelete) => {
      if (willDelete.value) {  
        this.spinnersLoad = true;
        this.deleteProduct = this.cart;
        this.products = [];
        this.cart = [];
        this.deleteProduct.forEach(element => {
          debugger;
          if (element != id) { 
            this.cart.push(element)
          }
        });
        if (this.cart != null) {
          this.getProduct(this.cart)
        }else{
          this.products.length = 0;
        }
        localStorage.removeItem("Product") 
        localStorage.setItem("product",JSON.stringify(this.cart));   
        this.homeCom.cartCount = this.cart.length;
      }
    })
  }
}

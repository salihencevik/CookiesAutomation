import { Component, OnInit, ViewChild } from '@angular/core';
import { HomelayoutComponent } from 'src/app/Layout/HomeLayout/homelayout.component';
import { CartService } from 'src/app/Service/cart/cart.service';
import { ProductService } from 'src/app/Service/Product/product.service';
import { PageMode } from 'src/app/Enum/PageMode';
import { CustomerService } from 'src/app/Service/customer/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogElementsComponent } from '../dialog-elements/dialog-elements.component';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Customer } from 'src/app/Model/Customer';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {  
  myCart = []
  constructor(private homCom : HomelayoutComponent,private productService:ProductService,private defaultService:DefaultService<Customer>,private customerService:CustomerService,public dialog: MatDialog) { 
    this.customerId = +localStorage.getItem("customerId");     
    this.getUser(this.customerId) 
  }
  deneme = []
  customerId:number;
  productCount;
  productPrice;
  product;
  isSaled:boolean = false;
  user;
  totalPayment = 0;
  cart;
  ngOnInit() {   
    this.homCom.opened = false;
    debugger;
    if(this.customerId != 0) {  
      this.getUser(this.customerId) 
      length
    }else{
      this.cart = this.homCom.productCart;
      this.getproduct(this.cart)  
    }
  } 
  getproduct(model = []){  
    debugger;
    model.forEach(element => { 
      this.productService.getProductId(element).subscribe(data=> {  
        if(this.deneme.length != 0){
            this.cart = this.deneme;
        }
        debugger
        this.productCount = 0;   
        this.product = data; 
        this.totalPayment =   this.totalPayment + this.product.price / 2;
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
  payment(){  
    if(this.customerId == 0){
      this.homCom.mode = PageMode.View;
      this.homCom.opened = true 
    }else{ 
      Swal.fire({
        title: "Ödeme İşlemi Gerçekleşicek.", 
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Tamam',
        cancelButtonText: 'Hayır Vazgeç',
        reverseButtons: true
      }).then((willDelete) => {
        if (willDelete.value) {    
          this.customerService.payment(this.customerId,this.myCart).subscribe(data => {
            console.log(data);
            this.myCart = [];
            localStorage.removeItem("product")
            localStorage.removeItem("cartCount")
            this.homCom.cartCount = 0
            this.isSaled = true
           
          });
        }
      })
    
    }
  }
  getUser(id:number){   
    this.customerService.getItemId(this.customerId).subscribe(data => {     
      this.cart = data;
      this.deneme = this.cart.cartList 
      this.getproduct(this.deneme)  
   });   
  }
}

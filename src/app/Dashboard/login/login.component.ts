import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';  
import { PageMode } from 'src/app/Enum/PageMode';
import {AuthService,FacebookLoginProvider} from 'ng4-social-login';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ValidationService } from 'src/app/Service/validation/validation.service';
import { LoginService } from 'src/app/Service/login/login.service';
import { SnackBarService } from 'src/app/Service/SnackBar/snackbar.service';
import { Router } from '@angular/router';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Customer } from 'src/app/Model/Customer';
import { CartService } from 'src/app/Service/cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  loginCustomer:FormGroup;
  facebookLoginForm:FormGroup;
  Customer: any;
  cartControllLogin;
  customerId;
  constructor(private cartService:CartService,private defaultService:DefaultService<Customer>,private authService:AuthService,private fb: FormBuilder,private router:Router,public validation:ValidationService,private loginService:LoginService,private snackBar:SnackBarService) {
    this.cartControllLogin = +localStorage.getItem("cartCount");   
    this.customerId = +localStorage.getItem("customerId");  
   } 
  @Input() mode: PageMode; 
  @Input() user;
  @Input() cartCount;
  @Input() login: boolean = false;
  @Input() cart: [];
  @Output() userChange = new EventEmitter();
  @Output() modeChange = new EventEmitter();
  @Output() loginChange = new EventEmitter();  
  @Output() cartCountChange = new EventEmitter();  

  
  ngOnInit() {    
    if (this.cart == null) { 
      this.loginCustomer = this.fb.group({
        email:new FormControl("",[Validators.required,Validators.email]),
        password:new FormControl("",Validators.required),  
      });  
    }
    else
    {
      this.loginCustomer = this.fb.group({
        email:new FormControl("",[Validators.required,Validators.email]),
        password:new FormControl("",Validators.required), 
        Carts:this.fb.array(this.cart)
      });  
    } 
  } 
  get getControls(){
    return this.loginCustomer.controls;
  }
  facebookLogin(){
    this.facebookLoginForm= this.fb.group({
      email:new FormControl(),
      name:new FormControl(), 
    }); 
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userdata)=> {   
      this.user = userdata;
      var facebookForm = this.facebookLoginForm.value;
      facebookForm.name = this.user.name;
      facebookForm.email = this.user.email;
      this.defaultService.add("Customer",this.facebookLoginForm.value).subscribe(data => { 
      });  
      this.loginChange.emit(this.login = true); 
      this.userChange.emit(this.user);   
    });
  }  
  getCreatePage(){
    this.mode = PageMode.Create;
    this.modeChange.emit(this.mode);
  }
  onSubmit(){
    if (this.loginCustomer.valid){  
      debugger;
      this.loginService.login(this.loginCustomer.value).subscribe((data) => {  
        if (data == null) {
          this.snackBar.open("Email veya Şifre Hatalı");
        }
        else{  
          debugger;
          this.user = data;  
          console.log(this.user);
          localStorage.setItem("customerId",this.user.id); 
          this.snackBar.open("Giriş Başarılı Hoşgeldiniz " + this.user.name);  
          this.cartCountChange.emit(this.user.cartCount)
          localStorage.setItem("cartCount",this.user.cartCount)
          this.userChange.emit(this.user);  
          localStorage.removeItem("product"); 
          this.cart = this.user.cartList; 
          this.modeChange.emit(this.mode = PageMode.Loged);
        }
      }); 
    } 
  }
}

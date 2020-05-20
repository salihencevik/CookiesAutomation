import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl ,FormBuilder, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/Service/validation/validation.service';
import { PageMode } from 'src/app/Enum/PageMode';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Customer } from 'src/app/Model/Customer';
import { SnackBarService } from 'src/app/Service/SnackBar/snackbar.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
 
  constructor(public validation:ValidationService,private router:Router,private fb: FormBuilder,private defaultService:DefaultService<Customer>,private snackBar:SnackBarService) { }
  passwordCheck:boolean = false;
  newCustomer:FormGroup;
  url:string = "Customer";
  @Input() mode: PageMode; 
  @Input() user;
  @Input() login: boolean = false;
  @Output() userChange = new EventEmitter();
  @Output() modeChange = new EventEmitter();
  @Output() loginChange = new EventEmitter(); 
  
  ngOnInit() {
    this.newCustomer = this.fb.group({
      name:new FormControl("",Validators.required), 
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required,Validators.maxLength(6)]),
      password2:new FormControl("",[Validators.required,Validators.maxLength(6)])
    }); 
  }
  get getControls(){
    return this.newCustomer.controls;
  } 
  onSubmit(){
    if (this.newCustomer.valid) {
      var customer = this.newCustomer.value;
    if (customer.password == customer.password2) {
      this.defaultService.add(this.url,this.newCustomer.value).subscribe(data => {
        if (data == false) { 
          this.snackBar.open("Bu Email Kullanılıyor!")
        }
        else if(data != null && data != false){
          this.snackBar.open("Kayıt Başarılı Lütfen Giriş Yapın");
          this.mode = PageMode.View;
          this.modeChange.emit(this.mode);
        }
      });
    }else{
      this.snackBar.open("Şifreler birbirlerine uymuyor!")
    } 
    } 
  }
  getLoginPage(){
    this.mode = PageMode.View;
    this.modeChange.emit(this.mode);
  }
}

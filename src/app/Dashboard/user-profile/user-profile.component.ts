import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationService } from 'src/app/Service/validation/validation.service';
import { DefaultService } from 'src/app/Service/defaultService/default.service';
import { Customer } from 'src/app/Model/Customer';
import { HomelayoutComponent } from 'src/app/Layout/HomeLayout/homelayout.component';
import { CustomerService } from 'src/app/Service/customer/customer.service';
import { SnackBarService } from 'src/app/Service/SnackBar/snackbar.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit { 
  userId;
  result;
  isConditionIsTrue:boolean = false;
  UserProfileForm:FormGroup;
  constructor( private homeCom:HomelayoutComponent,private snackBarService:SnackBarService,private defaultService:DefaultService<Customer>,private router:Router,private route:ActivatedRoute,public validation:ValidationService) { }

  ngOnInit() { 
    this.homeCom.opened = false 
    this.userId = Number(this.route.snapshot.paramMap.get("id"));
    this.defaultService.getCustomerId("Customer",this.userId).subscribe(data => {
      this.result = data; 
      this.getControls.Id.setValue(this.result.id); 
      this.getControls.Email.setValue(this.result.email); 
      this.getControls.Name.setValue(this.result.name); 
      this.getControls.Phone.setValue(this.result.phone); 
      this.getControls.Email.setValue(this.result.email); 
      this.getControls.Adress.setValue(this.result.adress); 
    })
    this.UserProfileForm = new FormGroup({
      Id:new FormControl(""),
      Name:new FormControl("",Validators.required),
      Email:new FormControl("",Validators.required), 
      Phone:new FormControl("",Validators.required), 
      Adress:new FormControl("",Validators.required), 
      Password:new FormControl(""), 
      Password2:new FormControl(""), 
      Password3:new FormControl(""), 
    });
  }
  get getControls(){
    return this.UserProfileForm.controls;
  }
  onSubmit(){ 
    debugger;
    if (this.UserProfileForm.valid) { 
      if(this.UserProfileForm.value.Password2 == this.UserProfileForm.value.Password3){
        this.defaultService.update("Customer",this.UserProfileForm.value,this.userId).subscribe(data => {
          debugger
         if(data != 1){
          this.snackBarService.open("Güncelleme Başarılı")
         }else{
          this.snackBarService.open("Eski Şifre Yanlış!")
         }
        })
      }else{
        this.snackBarService.open("Yeni Şifreler Uyumsuz!")
      }
    }
  }
  newPassword(event){
    if(event != ""){
      this.isConditionIsTrue = true;
    }else{
      this.isConditionIsTrue = false;
    }
  }
}

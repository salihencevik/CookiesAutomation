import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/Service/validation/validation.service';
import { SnackBarService } from 'src/app/Service/SnackBar/snackbar.service';
import { UserService } from 'src/app/Service/User/user.service';
import { User } from 'src/app/Model/User';

@Component({
  selector: 'app-admin-panel-login',
  templateUrl: './admin-panel-login.component.html',
  styleUrls: ['./admin-panel-login.component.css']
})
export class AdminPanelLoginComponent implements OnInit {

  constructor(private fb: FormBuilder,private router:Router,public validation:ValidationService,private snackBarService:SnackBarService,private UserService:UserService) { }
  loginAdmin:FormGroup;
  User;
  ngOnInit() {
    this.loginAdmin = this.fb.group({
      Username:new FormControl("",[Validators.required]),
      Password:new FormControl("",Validators.required),  
    });  
  }
  get getControls(){
    return this.loginAdmin.controls;
  }
  onSubmit(){
    if (this.loginAdmin.valid){  
      this.UserService.Userlogin(this.loginAdmin.value).subscribe(data => {
        this.User = data;
        console.log(this.User);
        if(this.User != null){
          localStorage.setItem("UserId",this.User.id);
          this.router.navigateByUrl('Admin')
        }else{
          this.snackBarService.open('Kullanıcı Adı veya Şifre Hatalı.');
        }
      })
    }else {
      this.snackBarService.open('Lütfen Zorunlu Alanları Doldurun.');
    }
  }
}

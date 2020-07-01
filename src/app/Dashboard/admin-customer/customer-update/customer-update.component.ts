import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DefaultService } from 'src/app/Service/defaultService/default.service'; 
import { Router ,ActivatedRoute} from '@angular/router';
import { ValidationService } from 'src/app/Service/validation/validation.service'; 
import { Customer } from 'src/app/Model/Customer';
import { CustomerService } from 'src/app/Service/customer/customer.service';
import { HomelayoutComponent } from 'src/app/Layout/HomeLayout/homelayout.component';
@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  customerId;
  result;
  CustomerEmailForm:FormGroup;
  constructor(private defaultService:DefaultService<Customer>,public validation:ValidationService,private router:Router,private route:ActivatedRoute,private customerService:CustomerService) { }

  ngOnInit() { 
    this.customerId = Number(this.route.snapshot.paramMap.get("id"));
    this.defaultService.getCustomerId("Customer",this.customerId).subscribe(data => {
      console.log(data);
      this.result = data;
      this.getControls.Email.setValue(this.result.email); 
    });
    this.CustomerEmailForm = new FormGroup({
      Email:new FormControl("",Validators.required),
      Subject:new FormControl("",[Validators.required]),
      Content:new FormControl("",Validators.required), 
    });
  }
  get getControls(){
    return this.CustomerEmailForm.controls;
  }
  onSubmit(){
    if (this.CustomerEmailForm.valid) {
      this.customerService.SendSMS(this.CustomerEmailForm.value).subscribe(data => {
        console.log(data);
      });
    }
  }
}

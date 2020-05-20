import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }
  GetValidationMessages(f:AbstractControl,name:string) {
    if(f.errors)
    {
      for(let errormessage in f.errors)
      {
        if(errormessage == "required")
        return   name + " alanı boş bırakılamaz!";
        else if(errormessage == "email")
        return 'Email formatı yanlış!';
        else if(errormessage == "minlength")
        return  name + " alanı en az 5 karakter olmalı!";
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    email:String;
    password:String;
  }


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Bitte etwas eingeben';
    }

    return this.email.hasError('email') ? 'Ungültige E-Mail' : '';
  }

  login(email:String, password:String){
    console.log(email, password);
    
  }
  
}

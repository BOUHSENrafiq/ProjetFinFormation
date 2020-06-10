import { Component, OnInit } from '@angular/core';
import {AddService} from '../services/add.service';
import {Router} from '@angular/router';
import LoginUserData from '../../models/loginUserData';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerUserData: LoginUserData;
  public formulaire: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private addService: AddService, private router: Router, private form: FormBuilder) { }

  ngOnInit(): void {
    this.registerUserData = new LoginUserData();
    this.formulaire = this.form.group({
      email: ['', [Validators.required, Validators.email]], // make the email a required area with email validators (syntax...)
      password: ['', [Validators.required]], // make the phoneNumber a required area
    });
  }
 registerUser(){
    this.addService.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home']);
        },
        err => console.log(err));
    // console.log(this.registerUserData);
 }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please tape a valid email';
    } else {
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
  }
}

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
  /**
   * @instance registerUserData
   */
  registerUserData: LoginUserData;
  public formulaire: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);

  /**
   * @description inject services, constructor with private fields
   * @method constructor
   * @param addService instance of addService
   * @param router instance of Router
   * @param form instance of FormBuilder
   */
  constructor(private addService: AddService, private router: Router, private form: FormBuilder) { }

  ngOnInit(): void {
    this.registerUserData = new LoginUserData(); // create a new object registerUserserData
    this.formulaire = this.form.group({
      email: ['', [Validators.required, Validators.email]], // make the email a required area with email validators (syntax...)
      password: ['', [Validators.required]], // make the phoneNumber a required area
    });
  }

  /**
   * @description function that in charge of make a registration of a new user.
   * @method registerUser
   */
 registerUser(){
    this.addService.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res); // show response on the console
          localStorage.setItem('token', res.token); // storage the token on localStorage
          this.router.navigate(['/Home']); // if ok navigate directly to Home
        },
        err => console.log(err));
    // console.log(this.registerUserData);
 }

  /**
   * @description Errors are hidden initially and will be displayed on invalid form fields after the user has interacted
   * with the element or the parent form has been submitted
   * @method getErrorMessage
   */
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please tape a valid email';
    } else {
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {AddService} from '../services/add.service';
import {Router} from '@angular/router';
import LoginUserData from '../../models/loginUserData';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * @class LoginComponent
 */
export class LoginComponent implements OnInit {
  /**
   * @instance loginuserData
   */
  loginuserData: LoginUserData;
  public formulaire: FormGroup;

  /**
   * @description inject services
   * @method constructor
   * @param addService instance of addService
   * @param router instance of Router
   * @param form instance of FormBuilder
   */
  constructor(private addService: AddService, private router: Router, private form: FormBuilder) {
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    this.loginuserData = new LoginUserData(); // create a new object loginuserData
    this.formulaire = this.form.group({
      email: ['', [Validators.required, Validators.email]], // make the email a required area with email validators (syntax...)
      password: ['', [Validators.required]], // make the phoneNumber a required area
    });
  }
  /**
   * @description function that in charge of make a registration of a new user.
   * @method loginUser
   */
  loginUser() {
    this.addService.loginUser(this.loginuserData)
      .subscribe(
        res => {
          // console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['Home']);
        },
        err => console.log(err));
    // console.log(this.loginuserData);
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

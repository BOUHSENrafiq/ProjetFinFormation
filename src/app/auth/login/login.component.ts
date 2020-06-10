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
export class LoginComponent implements OnInit {
  loginuserData: LoginUserData;
  public formulaire: FormGroup;

  constructor(private addService: AddService, private router: Router, private form: FormBuilder) {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit(): void {
    this.loginuserData = new LoginUserData();
    this.formulaire = this.form.group({
      email: ['', [Validators.required, Validators.email]], // make the email a required area with email validators (syntax...)
      password: ['', [Validators.required]], // make the phoneNumber a required area
    });
  }

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

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Please tape a valid email';
    } else {
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
  }
}

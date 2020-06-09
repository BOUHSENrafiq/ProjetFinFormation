import { Component, OnInit } from '@angular/core';
import {AddService} from '../services/add.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginUserData = {
    email: '',
    password: ''
  };
  constructor(private addService: AddService, private router: Router) { }

  ngOnInit(): void {
  }
loginUser(){
  this.addService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        // console.log(res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['Home']);
      },
    err => console.log(err));
  // console.log(this.loginUserData);
}
}

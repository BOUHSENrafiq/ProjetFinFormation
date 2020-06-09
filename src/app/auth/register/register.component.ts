import { Component, OnInit } from '@angular/core';
import {AddService} from '../services/add.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerUserData = {email: '', password: ''}; // public user = { email: '' };
  constructor(private addService: AddService, private router: Router) { }

  ngOnInit(): void {
  }
 registerUser(){
    this.addService.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/login']);
        },
        err => console.log(err));
    // console.log(this.registerUserData);
 }
}

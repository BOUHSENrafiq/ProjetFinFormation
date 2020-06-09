import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddService {
private url = 'http://localhost:7777/api/register';
private loginUrl = 'http://localhost:7777/api/login';
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * @function [registerUser]
   * @param user
   */
  registerUser(user){
    return this.http.post<any>(this.url, user);
  }

  /**
   * @function [loginUser]
   * @param user
   */
  loginUser(user){
    return this.http.post<any>(this.loginUrl, user);
  }
  loggedIn(){
    return !!localStorage.getItem('token'); // return true if the token exist in localstorage or false if it doesn't exist
  }
  getToken(){
    return localStorage.getItem('token');
  }
  logoutUser(){
    localStorage.removeItem('token');
    return this.router.navigate(['/login']);
  }
}

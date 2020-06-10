import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AddService {
private url = 'http://localhost:7777/api/register'; // API URL for registration
private loginUrl = 'http://localhost:7777/api/login'; // API URL for login
  /**
   * @description conthstructor with private injected services
   * @param http instrance of HttpClient
   * @param router instansce of Router
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * @description register a new user and save credentials in database.
   * @method registerUser
   * @param user - A user have an email and a password
   */
  registerUser(user){
    return this.http.post<any>(this.url, user);
  }

  /**@description login, compare credentials taped by a user with values in database and log in.
   * @method loginUser
   * @param user - A user have an email and a password
   */
  loginUser(user){
    return this.http.post<any>(this.loginUrl, user);
  }

  /**
   * @description return true if the token exist in localstorage or false if it doesn't exist
   * @method loggedIn
   */
  loggedIn(){
    return !!localStorage.getItem('token');
  }

  /**
   * @description if a user in logged out navigate to login page
   * @method logoutUser
   */
  logoutUser(){
    localStorage.removeItem('token');
    return this.router.navigate(['/login']);
  }
}

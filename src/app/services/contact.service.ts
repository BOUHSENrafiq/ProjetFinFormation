import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contactUrl = 'http://localhost:7777/api/contact'; // API URL
  /**
   * @description conthstructor with private injected services
   * @param http instrance of HttpClient
   * @param router instansce of Router
   */
  constructor(private http: HttpClient, private router: Router) { }

  /**
   * @description register a new meassage in database.
   * @method registerContactForm
   * @param contact -
   */
  registerContactForm(contact){
    return this.http.post<any>(this.contactUrl, contact);
  }

}

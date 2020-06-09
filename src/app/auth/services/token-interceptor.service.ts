import { Injectable, Injector } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import {AddService} from './add.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector, private addService: AddService) { }
  intercept(req, next){
    // let addService = this.injector.get(AddService);
    const tokenizedReq = req.clone({
      setHeaders: {
        Authorization: 'Bearer ${this.addService.getToken()}'
      }
    });
    return next.handle(tokenizedReq);
  }
}

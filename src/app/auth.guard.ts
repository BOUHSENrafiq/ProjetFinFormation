import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AddService} from './auth/services/add.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private addService: AddService, private router: Router) {
  }
  canActivate(): boolean {
    if (this.addService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

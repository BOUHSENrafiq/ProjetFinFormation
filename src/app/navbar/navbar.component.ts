import { Component, OnInit } from '@angular/core';
import {AddService} from '../auth/services/add.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public addService: AddService) { }

  ngOnInit(): void {
  }
  logout(){
    this.addService.logoutUser();
  }
}

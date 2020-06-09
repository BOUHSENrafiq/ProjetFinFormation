import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import component
import {MapComponent} from './map/map.component';
import {PiecharttestsdetailsComponent} from './piecharttestsdetails/piecharttestsdetails.component';
import {HomeComponent} from './auth/home/home.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
// url routes
const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'Home', component: MapComponent, canActivate: [AuthGuard]},
  { path: 'Details', component: PiecharttestsdetailsComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

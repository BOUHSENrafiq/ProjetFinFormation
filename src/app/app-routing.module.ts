import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import component
import {MapComponent} from './map/map.component';
import {StatComponent} from './stat/stat.component';
// url routes
const routes: Routes = [
  { path: 'Home', component: MapComponent },
  { path: 'Home', component: StatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

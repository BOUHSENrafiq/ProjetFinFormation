import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MapComponent } from './map/map.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import { StatComponent } from './stat/stat.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    StatComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatButtonModule, MatCardModule, MatIconModule,
    MatPaginatorModule, MatSelectModule, MatSidenavModule,
    MatSortModule, MatToolbarModule, MatTableModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      // google maps API key :
      apiKey: 'AIzaSyDGmsIYfiI7sJZu4Et8fhuyfOsjRw3E568'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

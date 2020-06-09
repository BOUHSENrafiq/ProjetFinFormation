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
import {ExtendedModule, FlexLayoutModule} from '@angular/flex-layout';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { MapComponent } from './map/map.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import { StatComponent } from './stat/stat.component';
import { DetailsComponent } from './details/details.component';
import {ChartsModule} from 'ng2-charts';
import { PiecharttestsdetailsComponent } from './piecharttestsdetails/piecharttestsdetails.component';
import { TestsTableComponent } from './tests-table/tests-table.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import {AuthGuard} from './auth.guard';
import {AddService} from './auth/services/add.service';
import {TokenInterceptorService} from './auth/services/token-interceptor.service';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {FormsModule} from '@angular/forms';
import {MarkerService} from './services/marker.service';
import {CalculService} from './services/calcul.service';
import {StatService} from './services/stat.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MapComponent,
    StatComponent,
    DetailsComponent,
    PiecharttestsdetailsComponent,
    TestsTableComponent,
    LineChartComponent,
    LoginComponent,
    RegisterComponent
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
    ChartsModule,
    ExtendedModule,
    AgmCoreModule.forRoot({
      // google maps API key :
      apiKey: 'AIzaSyDGmsIYfiI7sJZu4Et8fhuyfOsjRw3E568'
    }), FormsModule
  ],
  providers: [HttpClientModule, MarkerService, CalculService, StatService , AddService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}

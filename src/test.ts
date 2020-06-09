// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/dist/zone-testing';
import {getTestBed, TestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MarkerService} from './app/services/marker.service';
import {CalculService} from './app/services/calcul.service';
import {StatService} from './app/services/stat.service';
import {AddService} from './app/auth/services/add.service';
import {AuthGuard} from './app/auth.guard';
import {TokenInterceptorService} from './app/auth/services/token-interceptor.service';

beforeEach(() => TestBed.configureTestingModule({
  imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ],
  providers: [HttpClientModule, MarkerService, CalculService, StatService , AddService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }]
}));
declare const require: {
  context(path: string, deep?: boolean, filter?: RegExp): {
    keys(): string[];
    <T>(id: string): T;
  };
};

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().forEach(context);

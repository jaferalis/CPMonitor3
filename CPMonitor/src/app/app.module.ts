import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from '@auth0/auth0-angular';
import {  HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component'
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [AppComponent,HomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    MatSidenavModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
        // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'serverlessjaf.auth0.com',
      clientId: 'lbhTLMG4BYx3e6C5jRqWFHVJq6F0o4BJ',
      redirectUri: window.location.origin
    }),
    HttpClientModule,
  ],
  providers : [],
  bootstrap: [AppComponent]
})
export class AppModule { }

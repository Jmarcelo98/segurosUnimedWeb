import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarModule } from './shared/components/navbar/navbar.module';
import { CustomerAddEditModule } from './shared/components/customer-add-edit/customer-add-edit.module';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorInterceptor } from './core/interceptor/HttpErrorInterceptor';

import { IConfig, provideEnvironmentNgxMask } from 'ngx-mask'
import { AdresseAddEditModule } from './shared/components/adresse-add-edit/adresse-add-edit.module';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NavbarModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CustomerAddEditModule,
    AdresseAddEditModule,
    MatSnackBarModule,

  ],
  providers: [
    provideEnvironmentNgxMask(maskConfig),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

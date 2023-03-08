import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ControlErroresModule } from 'control-errores';
import { CuadroDialogoModule, ErrorHandlerService } from 'cuadroDialogo';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyInterceptor, RouterEvents } from 'cuadroDialogo';

@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ControlErroresModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    CuadroDialogoModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyInterceptor,
      multi: true,
    },
    RouterEvents,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

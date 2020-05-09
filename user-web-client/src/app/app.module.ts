import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginModule } from "./login/login.module";
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './auth/alert/alert.component';
import { CrudComponent } from './crud/crud.component';
import { CreateComponent } from './crud/create/create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AlertComponent,
    CrudComponent,
    CreateComponent,
    UserListComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

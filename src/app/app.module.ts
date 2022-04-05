import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { TodolistComponent } from './todolist/todolist.component';
import { TodolistitemComponent } from './todolistitem/todolistitem.component';
import { CommonModule } from '@angular/common';
import {OrderByPipe, NgPipesModule} from 'ngx-pipes';
import {TodoServiceService} from "./todo-service.service";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AuthGuard} from "./AuthGuard";
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    TodolistComponent,
    TodolistitemComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    NgPipesModule,
    HttpClientModule,
  ],
  providers: [OrderByPipe, TodoServiceService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

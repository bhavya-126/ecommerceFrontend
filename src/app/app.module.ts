import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerifyComponent } from './component/verify/verify.component';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { HeaderComponent } from './component/admin-home/header/header.component';
import { AddCategoryComponent } from './component/admin-home/add-category/add-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    PageNotFoundComponent,
    VerifyComponent,
    AdminHomeComponent,
    AddProductComponent,
    HeaderComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

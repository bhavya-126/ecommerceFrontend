import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { VerifyComponent } from './component/verify/verify.component';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { HeaderComponent } from './component/admin-home/header/header.component';
import { AddCategoryComponent } from './component/admin-home/add-category/add-category.component';
import { CartComponent } from './component/cart/cart.component';
import { PlaceOrderComponent } from './component/place-order/place-order.component';
import { Header2Component } from './component/header2/header2.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProductComponent } from './component/product/product.component';
import { DashboardComponent } from './component/admin-home/dashboard/dashboard.component';
import { PendingOrdersComponent } from './component/admin-home/pending-orders/pending-orders.component';
import { InterceptorService } from './services/interceptor.service';

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
        AddCategoryComponent,
        CartComponent,
        PlaceOrderComponent,
        Header2Component,
        ProfileComponent,
        ProductComponent,
        DashboardComponent,
        PendingOrdersComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,

    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
        }],
    bootstrap: [AppComponent]
})
export class AppModule { }

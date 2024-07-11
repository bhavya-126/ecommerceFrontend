import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { VerifyComponent } from './component/verify/verify.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminHomeComponent } from './component/admin-home/admin-home.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { AddCategoryComponent } from './component/admin-home/add-category/add-category.component';
import { CartComponent } from './component/cart/cart.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProductComponent } from './component/product/product.component';
import { DashboardComponent } from './component/admin-home/dashboard/dashboard.component';
import { PendingOrdersComponent } from './component/admin-home/pending-orders/pending-orders.component';

const routes: Routes = [
    { path: '', redirectTo: '/admin', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuardService.canActivatelogin] },
    { path: 'signup', component: SignupComponent, canActivate: [AuthGuardService.canActivatelogin] },
    { path: 'verify', component: VerifyComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuardService.canActivateHome] },
    { path: 'product/:product_id', component: ProductComponent, canActivate: [AuthGuardService.canActivateHome] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService.canActivateHome] },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuardService.canActivateHome] },
    {
        path: 'admin', component: AdminHomeComponent, canActivate: [AuthGuardService.canActivateAdmin], children: [
            { path: '', component: DashboardComponent },
            { path: 'add/product', component: AddProductComponent },
            { path: 'add/categroy', component: AddCategoryComponent },
            { path: 'peding/order', component: PendingOrdersComponent },
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

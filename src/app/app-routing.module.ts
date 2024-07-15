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
import { PATH } from './route'

const routes: Routes = [
    { path: '', redirectTo: PATH.ADMIN, pathMatch: 'full' },
    { path: PATH.LOGIN, component: LoginComponent, canActivate: [AuthGuardService.canActivatelogin] },
    { path: PATH.SIGNUP, component: SignupComponent, canActivate: [AuthGuardService.canActivatelogin] },
    { path: PATH.VERIFY, component: VerifyComponent },
    { path: PATH.HOME, component: HomeComponent, canActivate: [AuthGuardService.canActivateHome] },
    { path: PATH.PRODUCT, component: ProductComponent, canActivate: [AuthGuardService.canActivateHome] },
    { path: PATH.PROFILE, component: ProfileComponent, canActivate: [AuthGuardService.canActivateHome] },
    { path: PATH.CART, component: CartComponent, canActivate: [AuthGuardService.canActivateHome] },
    {
        path: PATH.ADMIN, component: AdminHomeComponent, canActivate: [AuthGuardService.canActivateAdmin], children: [
            { path: '', component: DashboardComponent },
            { path: PATH.ADD_PRODUCT, component: AddProductComponent },
            { path: PATH.ADD_CATEGORY, component: AddCategoryComponent },
            { path: PATH.PENDING_ORDERS, component: PendingOrdersComponent },
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

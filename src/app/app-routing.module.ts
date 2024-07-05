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

const routes: Routes = [
    { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'verify', component: VerifyComponent },
    { path: 'home', component: HomeComponent, },
    {
        path: 'admin/home', component: AdminHomeComponent, children: [
            { path: 'add/product', component: AddProductComponent },
            {path: 'add/categroy', component: AddCategoryComponent}
        ]
    },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

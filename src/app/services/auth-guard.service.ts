import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {
    static canActivateHome(): boolean {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('role') !== 'admin') {
            return true;
        }
        let router: Router = inject(Router);
        router.navigate(['/login']);
        return false;
    }

    static canActivateAdmin(): boolean {
        if (sessionStorage.getItem('token') && sessionStorage.getItem('role') === 'admin') {
            return true;
        }
        let router: Router = inject(Router);
        router.navigate(['/login']);
        return false;
    }

    static canActivatelogin(): boolean {
        if (!sessionStorage.getItem('token')) {
            return true;
        }
        let router: Router = inject(Router);
        if (sessionStorage.getItem('role') === 'admin') {

            router.navigate(['/admin']);
        }
        else {
            router.navigate(['/home']);
        }

        return false;
    }

}

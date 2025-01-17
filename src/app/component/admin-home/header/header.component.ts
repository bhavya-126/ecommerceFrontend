import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    httpService: HttpService = inject(HttpService);
    router: Router = inject(Router);
    logOut() {
        this.httpService.logOut();
        this.router.navigate(['/login'])
    }
}

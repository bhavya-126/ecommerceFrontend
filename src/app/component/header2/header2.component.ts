import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-header2',
    templateUrl: './header2.component.html',
    styleUrls: ['./header2.component.css']
})
export class Header2Component {
    httpService: HttpService = inject(HttpService);
    router: Router = inject(Router);
    logOut() {
        this.httpService.logOut();
        this.router.navigate(['/login'])
    }

    search(){
        
    }
}

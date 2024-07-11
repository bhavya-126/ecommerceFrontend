import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-admin-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
    httpService: HttpService = inject(HttpService);
    products: any[] = [];
    ngOnInit() {


    }
}

import { Component, OnInit, inject } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    httpService: HttpService = inject(HttpService);
    BASE_URL: string = this.httpService.BASE_URL + '/';
    user: any = {};
    wishlist: any[] = [];
    orderHistory: any[] = [];
    wishlistPage = Array(0)
    orderHistoryPage = Array(0)

    constructor() {
        this.httpService.getProfile().subscribe({
            next: (res: any) => {
                this.user = res.data
            },
            error: (err: any) => {
                console.log(err);

            }
        })
        this.wishlistProduct(0);
        this.getHistory(0);
    }

    ngOnInit(): void {

    }

    wishlistProduct(pageNo: number) {
        this.httpService.getWishlist(pageNo).subscribe({
            next: (res: any) => {
                this.wishlist = res.data.product
                this.wishlistPage = Array(Math.round(res.data.count / 5)).fill(0)
            },
            error: (err: any) => {
                console.log(err);
            }
        })
    }

    getHistory(pageNo: number) {
        this.httpService.getOrderHistory(pageNo).subscribe({
            next: (res: any) => {
                this.orderHistory = res.data.product
                this.orderHistoryPage = Array(Math.round(res.data.count / 5)).fill(0)
            },
            error: (err: any) => {
                console.log(err);

            }
        })
    }
}

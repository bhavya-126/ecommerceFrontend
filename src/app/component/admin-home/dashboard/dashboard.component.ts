import { Component, inject } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    constructor() { }
    httpService: HttpService = inject(HttpService);
    BASE_URL = this.httpService.BASE_URL + '/';
    products: any[] = [];
    outOfStock: any[] = [];
    outOfStockPage = Array(0);
    maxOrderedProduct: any[] = [];
    totalUsers: number = 0;
    sales: number = 0;
    totalProducts: number = 0;
    ngOnInit() {
        // this.httpService.getProduct(this.products.length).subscribe({
        //     next: (res: any) => {
        //         this.products.push(...res.data)
        //         this.products = this.products
        //         console.log("all products", this.products);

        //     },
        //     error: (err: any) => {
        //         console.log(err);
        //     }
        // })

        this.outOfStockProduct(0);
        this.maxOrderProduct(0);

        this.httpService.dashboardStatics().subscribe({
            next: (res: any) => {
                this.totalUsers = res.data.userCount;
                this.sales = res.data.sales;
                this.totalProducts = res.data.productCount;
            },
            error: (err: any) => {
                console.log(err);
            }
        })



    }

    outOfStockProduct(pageNo: number) {
        this.httpService.outOfStock(pageNo).subscribe({
            next: (res: any) => {
                this.outOfStock = res.data.products;
                this.outOfStockPage = Array(Math.round(res.data.count / 5)).fill(0)
            }
        })
    }

    maxOrderProduct(pageNo: number) {
        this.httpService.maxOrderedProduct(pageNo).subscribe({
            next: (res: any) => {
                this.maxOrderedProduct.push(...res.data);
            },
            error: (err: any) => {
                console.log(err);
            }
        })
    }

}

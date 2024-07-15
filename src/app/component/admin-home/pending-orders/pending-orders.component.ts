import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-pending-orders',
    templateUrl: './pending-orders.component.html',
    styleUrls: ['./pending-orders.component.css']
})
export class PendingOrdersComponent implements OnInit {
    product: any[] = [];
    pages = Array(0);
    httpService: HttpService = inject(HttpService);
    BASE_URL = this.httpService.BASE_URL + '/';

    ngOnInit() {
        this.pendingOrders(0);
    }

    pendingOrders(pageNo: number) {
        this.httpService.pendingOrders(pageNo).subscribe({
            next: (res: any) => {
                this.product = res.data.product;
                this.pages = Array(Math.ceil(res.data.count / 5)).fill(0);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
    updateOrder(orderId: string) {
        this.httpService.updateOrder(orderId, { status: 'delivered' }).subscribe({
            next: (res: any) => {
                let index = this.product.findIndex((order: any) => order._id === orderId);
                this.product[index].status = 'delivered';
            },
            error: (err: any) => {
                console.log(err);

            }
        })
    }
}

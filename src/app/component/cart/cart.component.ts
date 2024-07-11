import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent {
    httpService: HttpService = inject(HttpService);
    router: Router = inject(Router);
    cartData: any[] = [];
    totalMrp: number = 0;
    totalDiscount: number = 0;
    BASE_URL = this.httpService.BASE_URL + '/'
    constructor() {
        this.httpService.getCart().subscribe({
            next: (res: any) => {
                this.cartData = res.data
                console.log("cart", this.cartData);
                this.calculateBill()
            },
            error: (err: any) => {
                console.log(err);
            }
        })
    }

    calculateBill() {
        this.totalMrp = 0;
        this.totalDiscount = 0;
        this.cartData.forEach((product) => {
            this.totalMrp += product.productId.mrp * product.quantity
            this.totalDiscount += (product.productId.mrp * product.productId.discount / 100) * product.quantity
        })
    }

    addQuantity(productId: string) {
        let cartProduct = this.cartData.find((product) => {
            return product.productId._id === productId
        })
        if (cartProduct.quantity < cartProduct.productId.totalQuantity) {
            this.httpService.updateCartItem(productId, { quantity: cartProduct.quantity + 1 }).subscribe({
                next: (res: any) => {
                    ++cartProduct.quantity;
                    this.calculateBill()
                }
            })
        }
        else {
            Swal.fire({
                title: "out of stock",
                icon: "warning",
                iconHtml: "!",
                confirmButtonText: "ok"

            })
        }
    }
    removeQuantity(productId: string) {
        let cartProduct = this.cartData.find((product) => {
            return product.productId._id === productId
        })
        if (cartProduct.quantity > 1) {
            this.httpService.updateCartItem(productId, { quantity: cartProduct.quantity - 1 }).subscribe({
                next: (res: any) => {
                    --cartProduct.quantity;
                    this.calculateBill()
                }
            })
        }
        else if (cartProduct.quantity = 1) {
            this.removeProduct(productId)

        }
    }

    removeProduct(productId: string) {
        Swal.fire({
            title: "remove item",
            icon: "question",
            iconHtml: "?",
            confirmButtonText: "remove",
            cancelButtonText: "cancel",
            showCancelButton: true,
            showCloseButton: true
        }).then((res) => {
            if (res.isConfirmed)
                this.httpService.deletecartItem(productId).subscribe({
                    next: (res: any) => {
                        console.log(res);
                        this.cartData = this.cartData.filter((product) => product.productId._id !== productId)
                    }
                })

        })
    }
    placeOrder() {

        if (!this.cartData.length) {
            Swal.fire({ title: "cart is empty", icon: "warning", iconHtml: "!", confirmButtonText: "ok" })
        } else {
            this.httpService.placeOrder().subscribe({
                next: (res: any) => {
                    Swal.fire({
                        title: "order placed",
                        icon: "success",
                        iconHtml: "<i class='fas fa-check'></i>",
                        confirmButtonText: "ok"
                    }).then(() => {
                        this.router.navigate(['/home'])
                    })
                },
                error: (err: any) => {
                    console.log(err);
                }
            })
        }
    }
}

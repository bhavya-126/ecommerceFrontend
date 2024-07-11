import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    router: Router = inject(Router);
    httpService: HttpService = inject(HttpService);
    products: any[] = [];
    totalProducts: number = 0;
    pages = Array(0)
    pagecount = 0;
    constructor() {
        this.httpService.productsSubject.subscribe({
            next: (res: any) => {
                this.products = res
            }
        })
        this.httpService.getProduct(0).subscribe({
            next: (res: any) => {
                // this.products.push(...res.data.product)
                this.products = res.data.product
                this.httpService.productsSubject.next(this.products)
                this.totalProducts = res.data.productCount
                this.pagecount = Math.round(this.totalProducts / 5)
                this.pages = Array(this.pagecount).fill(0)
                console.log("pages: ", this.pagecount);
            }
        })
    }

    ngOnInit() {
    }

    onClickProduct(product_id: string) {
        this.router.navigate(['/product', product_id],);
    }

    onClickAddWishlist(productId: string) {
        let product = this.products.find((product) => product._id === productId)
        this.httpService.addToWishlist({ productId: productId }).subscribe({
            next: (res: any) => {
                product.wishlist = product.wishlist ? false : true;
            },
            error: (err: any) => {
                console.log(err);
            }
        })
    }

    onClickAddCart(productId: string) {
        let product = this.products.find((product) => product._id === productId)
        if (!product.inCart) {
            this.httpService.addToCart({ productId }).subscribe({
                next: (res: any) => {
                    product.inCart = true;
                },
                error: (err: any) => {
                    console.log(err);
                }
            })
        }
        else {
            this.router.navigate(['/cart'])
        }
    }

    loadPage(pageNo: number) {
        this.httpService.getProduct(pageNo).subscribe({
            next: (res: any) => {
                this.httpService.productsSubject.next([...res.data.product])
            },
            error: (err: any) => {
                console.log(err);
            }
        })
    }

    // loadMore() {
    //     this.httpService.getProduct(1).subscribe({
    //         next: (res: any) => {
    //             this.httpService.productsSubject.next([...res.data.product])
    //         },
    //         error: (err: any) => {
    //             console.log(err);
    //         }
    //     })
    // }
}

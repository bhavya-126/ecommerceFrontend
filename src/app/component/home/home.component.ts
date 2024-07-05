import { Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductRes } from 'src/app/interface/product-res';
import { HttpService } from 'src/app/services/http.service';
import { URL } from 'src/app/url';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    httpService: HttpService = inject(HttpService);
    productsSubject = new Subject()
    products: any[] = []
    constructor() {
        this.httpService.getProduct().subscribe({
            next: (res: any) => {
                console.log(res);
                this.productsSubject.next(res.data)
            },
            error: (err: any) => {
                console.log(err);
            }

        })
        this.productsSubject.subscribe({
            next: (res: any) => {
                console.log("---", res);
                this.products = res
            }
        })
    }

    onClickAddWishlist(productId: string) {
        let product = this.products.find((product) => product._id === productId)
        this.httpService.addToWishlist({ productId: productId }).subscribe({
            next: (res: any) => {
                product.wishlist = product.wishlist ? false : true
                // console.log(res);
            },
            error: (err: any) => {
                console.log(err);
            }
        })
    }

    addToCart(productId: string) {
        
    }
}

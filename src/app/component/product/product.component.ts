import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
    activatedRoute: ActivatedRoute = inject(ActivatedRoute);
    httpService: HttpService = inject(HttpService);
    router: Router = inject(Router);
    BASE_URL: string = this.httpService.BASE_URL + '/';
    productId: string = '';
    product: any = {};
    reviews: any[] = [];

    ngOnInit() {
        this.activatedRoute.params.subscribe({
            next: (res: any) => {
                this.productId = res.product_id;
            }
        })
        this.product = this.httpService.products.find((product: any) => product._id === this.productId);
        this.httpService.getReview(this.productId, this.reviews.length).subscribe((res: any) => {
            this.reviews.push(...res.data);
        })
    }

    onClickAddWishlist(productId: string) {
        let product = this.httpService.products.find((product) => product._id === productId)
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
        let product = this.httpService.products.find((product) => product._id === productId)
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
}

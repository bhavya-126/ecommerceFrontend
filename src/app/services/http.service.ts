import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { URL } from '../url';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    http: HttpClient = inject(HttpClient);
    BASE_URL = URL.BASE_URL;
    products: any[] = [];
    productsSubject = new Subject();
    wishlistSubject = new Subject();
    orderSubject = new Subject();
    constructor() {
        // this.getProduct(this.products.length).subscribe({
        //     next: (res: any) => {
        //         this.productsSubject.next(res.data)
        //     },
        //     error: (err: any) => {
        //         console.log(err);
        //     }

        // })
        this.productsSubject.subscribe({
            next: (res: any) => {

                this.products = res
            }
        })

    }
    login(data: any) {
        return this.http.post(URL.BASE_URL + URL.LOGIN, data)
    }
    signUp(data: any) {
        return this.http.post(URL.BASE_URL + URL.REGISTER, data)
    }
    verify(data: { otp: string }) {
        return this.http.post(URL.BASE_URL + URL.VERIFY, data)
    }
    addCategroy(data: any) {
        return this.http.post(URL.BASE_URL + URL.ADD_CATEGORY, { ...data },)
    }
    getCategory() {
        return this.http.get(URL.BASE_URL + URL.GET_CATEGORY,)
    }
    uploadImage(data: any) {
        return this.http.post(URL.BASE_URL + URL.UPLOAD_IMAGE, data,)
    }
    addProduct(data: any) {
        return this.http.post(URL.BASE_URL + URL.ADD_PRODUCT, data,)
    }
    getProduct(pageNo: number) {
        return this.http.get(URL.BASE_URL + URL.GET_PRODUCTS + "?pageNo=" + pageNo)
    }
    searchProduct(totalProduct: number, searchTxt: string) {
        return this.http.get(URL.BASE_URL + URL.GET_PRODUCTS + "?totalProduct=" + totalProduct + "&searchTxt=" + searchTxt, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), },
        })
    }
    addToWishlist(data: any) {
        return this.http.post(URL.BASE_URL + URL.WISHLIST, data,)
    }
    addToCart(data: any) {
        return this.http.post(URL.BASE_URL + URL.CART, data,)
    }
    getCart() {
        return this.http.get(URL.BASE_URL + URL.CART,)
    }
    deletecartItem(productId: string) {
        return this.http.delete(URL.BASE_URL + URL.CART + "?productId=" + productId,)
    }
    updateCartItem(productId: string, data: any) {
        return this.http.put(URL.BASE_URL + URL.CART + "?productId=" + productId, data,)
    }
    getProfile() {
        return this.http.get(URL.BASE_URL + URL.USER_PROFILE,)
    }
    getWishlist(pageNo: number,) {
        return this.http.get(URL.BASE_URL + URL.WISHLIST + "?pageNo=" + pageNo,)
    }
    getOrderHistory(pageNo: number) {
        return this.http.get(URL.BASE_URL + URL.ORDER + "?pageNo=" + pageNo,)
    }
    placeOrder() {
        return this.http.post(URL.BASE_URL + URL.PLACE_ORDER, {})
    }

    addReview(data: any, productId: string) {
        return this.http.post(URL.BASE_URL + URL.REVIEW + "?productId=" + productId, data,)
    }

    getReview(productId: string, totalReview: number) {
        return this.http.get(URL.BASE_URL + URL.REVIEW + "?productId=" + productId,)
    }

    dashboardStatics() {
        return this.http.get(URL.BASE_URL + URL.DASHBOARD_STATICS,)
    }

    outOfStock(pageNo: number) {
        return this.http.get(URL.BASE_URL + URL.OUT_OF_STOCK + "?pageNo=" + pageNo,)
    }

    maxOrderedProduct(pageNo: number) {
        return this.http.get(URL.BASE_URL + URL.PRODUCT_WITH_MAX_ORDER + "?pageNo=" + pageNo,)
    }

    pendingOrders(pageNo: number) {
        return this.http.get(URL.BASE_URL + URL.PENDING_ORDERS + "?pageNo=" + pageNo,)
    }

    updateOrder(orderId: string, data: any) {
        return this.http.put(URL.BASE_URL + URL.ORDER + "?orderId=" + orderId, data,);
    }

    logOut() {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
    }
}

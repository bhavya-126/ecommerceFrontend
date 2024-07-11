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
        return this.http.post(URL.BASE_URL + URL.ADD_CATEGORY, { ...data }, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    getCategory() {
        return this.http.get(URL.BASE_URL + URL.GET_CATEGORY, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    uploadImage(data: any) {
        return this.http.post(URL.BASE_URL + URL.UPLOAD_IMAGE, data, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    addProduct(data: any) {
        return this.http.post(URL.BASE_URL + URL.ADD_PRODUCT, data, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    getProduct(pageNo: number) {
        return this.http.get(URL.BASE_URL + URL.GET_PRODUCTS + "?pageNo=" + pageNo, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), },
        })
    }
    searchProduct(totalProduct: number, searchTxt: string) {
        return this.http.get(URL.BASE_URL + URL.GET_PRODUCTS + "?totalProduct=" + totalProduct + "&searchTxt=" + searchTxt, {
            headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token'), },
        })
    }
    addToWishlist(data: any) {
        return this.http.post(URL.BASE_URL + URL.WISHLIST, data, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    addToCart(data: any) {
        return this.http.post(URL.BASE_URL + URL.CART, data, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    getCart() {
        return this.http.get(URL.BASE_URL + URL.CART, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    deletecartItem(productId: string) {
        return this.http.delete(URL.BASE_URL + URL.CART + "?productId=" + productId, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    updateCartItem(productId: string, data: any) {
        return this.http.put(URL.BASE_URL + URL.CART + "?productId=" + productId, data, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    getProfile() {
        return this.http.get(URL.BASE_URL + URL.USER_PROFILE, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    getWishlist(pageNo: number,) {
        return this.http.get(URL.BASE_URL + URL.WISHLIST + "?pageNo=" + pageNo, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    getOrderHistory(pageNo: number) {
        return this.http.get(URL.BASE_URL + URL.ORDER_HISTOORY + "?pageNo=" + pageNo, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    placeOrder() {
        return this.http.post(URL.BASE_URL + URL.PLACE_ORDER, {}, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }

    addReview(data: any, productId: string) {
        return this.http.post(URL.BASE_URL + URL.REVIEW + "?productId=" + productId, data, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }

    getReview(productId: string, totalReview: number) {
        return this.http.get(URL.BASE_URL + URL.REVIEW + "?productId=" + productId, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }

    dashboardStatics() {
        return this.http.get(URL.BASE_URL + URL.DASHBOARD_STATICS, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }

    outOfStock(pageNo: number) {
        return this.http.get(URL.BASE_URL + URL.OUT_OF_STOCK + "?pageNo=" + pageNo, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }

    maxOrderedProduct(pageNo: number) {
        return this.http.get(URL.BASE_URL + URL.PRODUCT_WITH_MAX_ORDER + "?pageNo=" + pageNo, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }

    pendingOrders(pageNo: number){
        return this.http.get(URL.BASE_URL + URL.PENDING_ORDERS + "?pageNo=" + pageNo, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }

    logOut() {
        sessionStorage.removeItem('token');
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { URL } from '../url';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    http: HttpClient = inject(HttpClient);
    BASE_URL = URL.BASE_URL
    constructor() { }
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
    getProduct() {
        return this.http.get(URL.BASE_URL + URL.GET_PRODUCTS, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    addToWishlist(data: any) {
        return this.http.post(URL.BASE_URL + URL.WISHLIST, data, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
    addToCart(data: any) {
        return this.http.post(URL.BASE_URL + URL.CART, data, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') } })
    }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }
  canActivate(): boolean {
    if (sessionStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  }
}

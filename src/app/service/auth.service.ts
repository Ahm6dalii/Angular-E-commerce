import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { platform } from 'os';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isBrowser: boolean = false;
  loggedInUser: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(@Inject(PLATFORM_ID) platformid: object) {
    this.isBrowser = isPlatformBrowser(platformid);
    if (this.isBrowser) {
      console.log(localStorage.getItem('token'));
      if (localStorage.getItem('token')) {
        this.loggedInUser.next(localStorage.getItem('token'));
      }
    }
  }

  httpClient = inject(HttpClient);

  register(data): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      data
    );
  }
  signin(data): Observable<any> {
    return this.httpClient.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      data
    );
  }
  saveUserData(token: string) {
    if (this.isBrowser) localStorage.setItem('token', JSON.stringify(token));
    this.loggedInUser.next(token);
  }
}

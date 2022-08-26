import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../services/token-storage.service'

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  constructor(private token:TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authRequest = request;
    const user = this.token.getUser()
    if(user != null)
    {
      authRequest = request.clone({ headers: request.headers.set("Authorization", `bearer ${user.token}`) });
    }
    return next.handle(request);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
];

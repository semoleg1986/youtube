import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEY } from 'src/app/config/types';


@Injectable() 

export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const apiURL = request.url.includes('/youtube/v3') ? request.url : null;

    if (apiURL) {
      const modifiedRequest = request.clone({
        params: request.params.set('key', API_KEY),
      });
      return next.handle(modifiedRequest);
    }

    return next.handle(request);
  }
}

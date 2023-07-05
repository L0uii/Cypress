import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import {environment} from 'environments/environment';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const basicAuth = btoa(environment.alfrescoUser + ':' + environment.alfrescoPassword);

    return next.handle(httpRequest.clone({ setHeaders: {Authorization: `Basic ${basicAuth}` } }));
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly _authService: AuthService, private _router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = request.headers
      .append('Content-Type', 'application/json')
      .append('token', localStorage.getItem(AuthService.STORAGE_KEY) || '');

    const url = request.url;

    const req = request.clone({
      url: `http://localhost:3000${url}`,
      headers,
    });

    return next.handle(req).pipe(
      filter(
        (event: HttpEvent<unknown>): event is HttpResponse<{ data: unknown }> =>
          event instanceof HttpResponse,
      ),
      map((response: HttpResponse<{ data: any }>) => {
        return response.clone({ body: response.body });
      }),
      catchError((error) => {
        return throwError(error);
      }),
    );
  }
}

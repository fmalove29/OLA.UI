import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {

  const router = inject(Router);
  const token = localStorage.getItem('jwt_token');

  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        localStorage.removeItem('jwt_token');
        router.navigate(['/login']);
      }

      return throwError(() => error);
    })
  );
};

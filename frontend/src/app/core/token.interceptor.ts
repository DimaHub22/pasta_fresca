import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {ServiceAuthService} from "../shared/services/service-auth.service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private serviceAuth: ServiceAuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.serviceAuth.isAuthenticated()) {
      request = request.clone({
        setHeaders: {
          Authorization: (this.serviceAuth.getToken() as string)
        }
      })
    }
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => this.handleAuthError(error))
      )

  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      })
    }
    return throwError(error)
  }
}

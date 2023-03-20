import { MatDialog } from '@angular/material/dialog';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { saveRequestHTTP } from 'event-logs';
import { crearCuadroError } from './cuadro-dialogo.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private matDialog: MatDialog, private ngZone: NgZone) {}
  /**
   * Intercepts an outgoing HTTP request and logs the request method and URL.
   * @param {HttpRequest<any>} req - The outgoing HTTP request.
   * @param {HttpHandler} next - The next interceptor in the chain, or the backend if no more interceptors remain.
   * @returns {Observable<HttpEvent<any>>} An observable of the HTTP events, including the response.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.logRequest(req.method, req.url);
    const errorHeaderName = 'X-Error-Stack-Trace';

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status >= 500 || err.status == 0) {
          const errorWithStack = new Error(err.message);

          const newHeaders = err.headers.set(
            errorHeaderName,
            errorWithStack.stack || ''
          );
          const clonedResponse = new HttpResponse({
            status: err.status,
            statusText: err.statusText,
            headers: newHeaders,
            url: err.url || undefined,
            body: err.error || undefined,
          }); // Aquí puedes manejar el error como

          crearCuadroError(
            this.matDialog,
            this.ngZone,
            errorWithStack.stack
          ).handleError(err);
          throw err;
        } else {
          throw err;
        }
        // Devolvemos un observable que emite cualquier valor que no sea un error
      })
    );
  }

  /**
   * Logs the request method and URL.
   * @param {string} method - The HTTP method of the request.
   * @param {string} url - The URL of the request.
   */
  private logRequest(method: string, url: string) {
    var request = `${method} a ${url}`;
    saveRequestHTTP(request);
  }
}

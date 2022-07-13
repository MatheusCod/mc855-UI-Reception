import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
      console.log("hEREEE")
      const idToken = localStorage.getItem("id_token");
      console.log(idToken)
      if (idToken) {
          const cloned = req.clone({
              headers: req.headers.set("Authorization",
                  "Bearer " + idToken)
          });

          return next.handle(cloned);
      }
      else {
          return next.handle(req);
      }
  }
}

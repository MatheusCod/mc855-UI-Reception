import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = false;

  login(userName: string, password: string): Observable<any> {
    return this.http
      .post('api/login', {
        email: userName,
        password: password,
      })
      .pipe(map((result) => {
        this.setSession(result);
      }));
  }

  private setSession(authResult: any) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration ? expiration : '');
    return moment(expiresAt);
  }

  logout(): void {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');
  }

  constructor(private http: HttpClient) {}
}

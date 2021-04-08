import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import * as moment from "moment";

@Injectable({
  providedIn: 'root'
})

interface jwtToken {
  idToken: string;
  expiresIn: string
};
export class AuthService {
  constructor(private http: HttpClient) {

  }
  
  login(name: string, password: string) {
    return this.http.post<jwtToken>('/auth/login', { name, password })
      .pipe(
        tap(res => {
          this.setSession(res);
          localStorage.setItem('gm', name);
        })
      )

  }

  private setSession(authResult: { expiresIn: moment.DurationInputArg1; idToken: string; }) {
    const expiresAt = moment().add(authResult.expiresIn, 'second');
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("gm");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration || Date.now().toString());
    return moment(expiresAt);
  }
}
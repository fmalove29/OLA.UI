import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { AppEndpoints } from '../../../AppEndpoints';
import { LoginRequest } from '../../../models/request/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('jwt_token'));

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest) {
    return this.http.post<{ userToken: string }>(AppEndpoints.Auth.Login, credentials).pipe(
      tap({
        next: (response) => {
          if (response.userToken) {
            localStorage.setItem('jwt_token', response.userToken);
            this.loggedIn.next(true);
          }
        },
        error: (err) => {
          console.error('Login error:', err);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
    this.loggedIn.next(false);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

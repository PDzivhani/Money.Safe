import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { RegisterRequest } from '../models/RegisterRequest';
import { AuthenticationResponse } from '../models/AuthenticationResponse';
import { LoginRequest } from '../models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signUp(registerRequest: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${environment.apiBaseUrl}/auth/register`, registerRequest)
      .pipe(
        tap(response => {
          this.setToken(response.token);  // Default to long-lived token for registration
          this.setRefreshToken(response.refreshToken, true);
          this.authStatus.next(true); // Notify that user is logged in
        }),
        catchError(this.handleError)
      );
  }

  signIn(loginRequest: LoginRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${environment.apiBaseUrl}/auth/authenticate`, loginRequest)
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setRefreshToken(response.refreshToken);
          this.authStatus.next(true); // Notify that user is logged in
        }),
        catchError(this.handleError)
      );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {  // Changed to public
    return localStorage.getItem('jwt_token') || sessionStorage.getItem('jwt_token');
  }

  getUsername(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded ? decoded.firstName : null;
    }
    return null;
  }


  setToken(token: string): void {  // Default value added
      sessionStorage.setItem('jwt_token', token);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    this.clearToken();
    this.clearRefreshToken();
    localStorage.removeItem('username');  // Clear username or any other user-specific data
    this.router.navigate(['/signin']);
  }

  googleAuth(idToken: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/auth/google`, { idToken });
  }

  handleAuthSuccess(data: any): void {
    sessionStorage.setItem('user', JSON.stringify(data));
    this.router.navigate(['/']);
  }

  handleAuthError(error: any, defaultMessage: string): void {
    this.toastr.error(error.error.message || defaultMessage);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token') || sessionStorage.getItem('refresh_token');
  }

  // refreshToken(refreshToken: string): Observable<AuthenticationResponse> {
  //   return this.http.post<AuthenticationResponse>(`${environment.apiBaseUrl}/auth/refresh-token`, { refreshToken })
  //     .pipe(
  //       tap(response => {
  //         this.setToken(response.token, this.isTokenInLocalStorage());
  //         this.setRefreshToken(response.refreshToken, this.isTokenInLocalStorage());
  //       }),
  //       catchError(this.handleError)
  //     );
  // }

  private isTokenInLocalStorage(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

  setRefreshToken(refreshToken: string, p0?: boolean): void {  // Default value added
      sessionStorage.setItem('refresh_token', refreshToken);
  }

  private isTokenExpired(token: string): boolean {
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate ? expirationDate < new Date() : false;
  }

  private getTokenExpirationDate(token: string): Date | null {
    const decoded = this.decodeToken(token);
    if (decoded && decoded.exp) {
      return new Date(decoded.exp * 1000);
    }
    return null;
  }

  extractUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded ? decoded.id : null; // Assuming 'id' is the key for user ID in the token payload
    }
    return null;
  }

  private decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  }



  clearToken(): void {
    localStorage.removeItem('jwt_token');
    sessionStorage.removeItem('jwt_token');
  }

  clearRefreshToken(): void {
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('refresh_token');
  }

 
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error.message);
    return throwError(error.error.message);
  }
}

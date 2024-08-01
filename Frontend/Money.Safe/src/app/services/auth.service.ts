import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  signIn(formData: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/signin`, formData);
  }

  signUp(formData: any): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/signup`, formData);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  googleAuth(idToken: string): Observable<any> {
    return this.http.post(`${environment.apiBaseUrl}/google-auth`, { idToken });
  }

  handleAuthSuccess(data: any): void {
    sessionStorage.setItem('user', JSON.stringify(data));
    this.router.navigate(['/']);
  }

  handleAuthError(error: any, defaultMessage: string): void {
    this.toastr.error(error.error.message || defaultMessage);
  }
}

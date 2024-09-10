import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { environment, environments } from '../environments/environment';
import { Users } from '../models/Users';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environments.apiBaseUrl}/auth`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private userSubject = new BehaviorSubject<Users | null>(null);
  user$ = this.userSubject.asObservable();

  updateUsers(user: Users) {
    this.userSubject.next(user);
  }

  getUser(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  updateUser(id: number, formData: FormData): Observable<Users> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error('No token found.');
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.put<Users>(`${this.apiUrl}/${id}`, formData, { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    console.error('Status:', error.status);
    console.error('Error body:', error.error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
}
}

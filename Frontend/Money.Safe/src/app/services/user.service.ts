import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = { username: 'Phophi' }; // Example user object

  constructor() {}

  getUser(): Observable<any> {
    return of(this.user); // Replace with actual API call if needed
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('user');
  }
}

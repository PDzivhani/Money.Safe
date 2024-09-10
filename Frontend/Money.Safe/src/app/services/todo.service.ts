import { Injectable } from '@angular/core';
import { environment, environments } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${environments.apiBaseUrl}/todo`;


  constructor(private http: HttpClient) { }

  getTransactionsByMonth(month: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${month}`);
  }

  addTransaction(todo: any): Observable<any> {
    return this.http.post(this.apiUrl, todo);
  }
}

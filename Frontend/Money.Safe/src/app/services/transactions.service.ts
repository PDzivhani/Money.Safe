import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = `${environment.apiBaseUrl}/transHistory`;

  constructor(private http: HttpClient) { }

  getTransactionsByMonth(month: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions?month=${month}`);
  }

  getTotalExpense(month: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/transactions/total?month=${month}`);
  }
}

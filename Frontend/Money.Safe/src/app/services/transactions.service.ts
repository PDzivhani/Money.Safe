import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = 'API_ENDPOINT/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  deleteTransaction(transactionId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${transactionId}`);
  }
}

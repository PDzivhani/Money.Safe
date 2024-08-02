// balance-tracking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceTrackingService {
  private apiUrl = `${environment.apiBaseUrl}/income`;

  constructor(private http: HttpClient) {}

  getIncomesByMonth(month: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${month}`);
  }

  addIncome(income: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, income);
  }

  deleteIncome(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

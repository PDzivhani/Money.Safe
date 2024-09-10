import { Injectable } from '@angular/core';
import { environment, environments } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense } from '../models/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  private apiUrl = `${environments.apiBaseUrl}/expenses`;

  constructor(private http: HttpClient) { }

  // Get expenses for a specific month
  getExpensesByMonth(month: string): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.apiUrl}/${month}`);
  }

  // Add a new expense
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.apiUrl, expense);
  }
  

  getAllExpenses(): Observable<Expense> {
    return this.http.get<Expense>(this.apiUrl);
  }
}

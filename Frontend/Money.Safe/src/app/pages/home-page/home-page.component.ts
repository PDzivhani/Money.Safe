import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BalanceTrackingService } from 'src/app/services/balance-tracking.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  username: string | null = null;

  // Data that will be fetched from the services
  lastMonthsIncome: any[] = [];
  currentMonthIncome: string = '';
  lastMonthsExpense: any[] = [];
  currentMonthExpense: string = '';
  todoTransactions: any[] = [];
  
  totalCurrentMonthIncome: number = 0;
  totalCurrentMonthExpense: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private balanceTrackingService: BalanceTrackingService,
    private expenseService: ExpenseService,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.loadUsername();
    this.loadIncomeData();
    this.loadExpenseData();
    this.loadTodoTransactions();
  }

  loadUsername() {
    this.username = this.authService.getUsername();
  }

  loadIncomeData() {
    // Fetch income data for the current month
    this.balanceTrackingService.getIncomesByMonth('current')
      .subscribe(data => {
        this.currentMonthIncome = `R${data.reduce((sum, income) => sum + income.amount, 0)}`;
        this.totalCurrentMonthIncome = data.reduce((sum, income) => sum + income.amount, 0);
        this.lastMonthsIncome = data.map(income => `${income.month}: R${income.amount}`);
      });
  }

  loadExpenseData() {
    // Fetch expense data for the current month
    this.expenseService.getExpensesByMonth('current')
      .subscribe(data => {
        this.currentMonthExpense = `R${data.reduce((sum, expense) => sum + expense.expenseAmount, 0)}`;
        this.totalCurrentMonthExpense = data.reduce((sum, expense) => sum + expense.expenseAmount, 0);
        this.lastMonthsExpense = data.map(expense => `${expense.month}: R${expense.expenseAmount}`);
      });
  }

  loadTodoTransactions() {
    // Fetch to-do transactions for the current month
    this.todoService.getTransactionsByMonth('current')
      .subscribe(data => {
        this.todoTransactions = data.map((transaction: { description: any; }) => ({ description: transaction.description }));
      });
  }

  onIncome() {
    this.router.navigate(['/balance']);
  }
  
  onExpense() {
    this.router.navigate(['/expense']);
  }
  
  onTodo() {
    this.router.navigate(['/todo']);
  }

  // Calculate total savings
  get currentMonthSavings(): number {
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}

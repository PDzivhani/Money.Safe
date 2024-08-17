import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Expense } from 'src/app/models/Expense';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  expenseForm!: FormGroup;
  selectedMonth: string = '';
  expenses: Expense[] = [];
  monthSelected: boolean = false;

  constructor(private fb: FormBuilder, private expenseService: ExpenseService, 
    public router: Router) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });
  }

  onSubmitExpense() {
    if (this.expenseForm.valid) {
      const newExpense: Expense = this.expenseForm.value;

      this.expenseService.addExpense(newExpense).subscribe({
        next: (expense) => {
          this.expenses.push(expense);
          this.expenseForm.reset({ month: this.selectedMonth });
          this.getExpensesForSelectedMonth(); // Refresh the list
        },
        error: (error) => console.error('Error adding expense:', error)
      });
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getExpensesForSelectedMonth();
  }

  getExpensesForSelectedMonth() {
    if (this.selectedMonth) {
      this.expenseService.getExpensesByMonth(this.selectedMonth).subscribe({
        next: (expenses) => this.expenses = expenses,
        error: (error) => console.error('Error fetching expenses:', error)
      });
    }
  }

  calculateTotalExpense(): number {
    return this.expenses.reduce((acc, curr) => acc + curr.expenseAmount, 0);
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  saveForm() {
    console.log("Form saved!");
  }
}

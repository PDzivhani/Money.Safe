import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnInit {
  todoForm: any;
  selectedMonth: string;
  expenses: any[] = [];
  monthSelected: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private todoService: TodoService
  ) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' });
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      month: ['', Validators.required],
      expenseType: ['', Validators.required],
      expenseAmount: ['', Validators.required]
    });

    this.loadExpenses(this.selectedMonth);
  }

  loadExpenses(month: string) {
    this.todoService.getTransactionsByMonth(month).subscribe(
      (data: any[]) => {
        this.expenses = data;
      },
      (error) => {
        console.error('Error fetching expenses:', error);
      }
    );
  }

  onSubmitExpense() {
    if (this.todoForm.valid) {
      const newExpense = this.todoForm.value;
      this.todoService.addTransaction(newExpense).subscribe(
        (savedExpense) => {
          this.expenses.push(savedExpense);
          this.todoForm.reset();
          this.loadExpenses(this.selectedMonth);
        },
        (error) => {
          console.error('Error adding expense:', error);
        }
      );
    }
  }

  onChangeExpense(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.loadExpenses(this.selectedMonth);
  }

  calculateTotalExpense(month: string): number {
    return this.expenses
      .filter(expense => expense.month === month)
      .reduce((total, expense) => total + expense.expenseAmount, 0);
  }

  onBack() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  toggleSelection(expense: any) {
    expense.selected = !expense.selected;
  }

  saveForm() {
    console.log("Form saved!");
  }
}

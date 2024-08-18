import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  todoForm: FormGroup;
  selectedMonth: string = '';
  transactions: any[] = [];
  totalExpense: number = 0;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionsService,
    private router: Router,
  ) {
    this.todoForm = this.fb.group({
      month: ['']
    });
  }

  ngOnInit() {
    this.todoForm.get('month')?.valueChanges.subscribe(month => {
      if (month) {
        this.selectedMonth = month;
        this.getTransactions(month);
        this.getTotalExpense(month);
      }
    });
  }

  getTransactions(month: string) {
    this.transactionService.getTransactionsByMonth(month).subscribe(data => {
      this.transactions = data;
    });
  }

  getTotalExpense(month: string) {
    this.transactionService.getTotalExpense(month).subscribe(total => {
      this.totalExpense = total;
    });
  }

  onSubmitExpense() {
    // Handle form submission
  }

  onChangeExpense(event: any) {
    // Handle change
  }

  getFilteredExpenses() {
    return this.transactions;
  }

  calculateTotalExpense(month: string) {
    return this.totalExpense;
  }

  onBack() {
    this.router.navigate(['/home']);
  }

  saveForm() {
    console.log("Form saved!");
  }
}

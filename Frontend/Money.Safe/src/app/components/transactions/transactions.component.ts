import { Component } from '@angular/core';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent {
  transactions: any[] = [];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe(transactions => {
      this.transactions = transactions;
    });
  }

  deleteTransaction(transactionId: number): void {
    this.transactionsService.deleteTransaction(transactionId).subscribe(() => {
      this.loadTransactions();
    });
  }
}
